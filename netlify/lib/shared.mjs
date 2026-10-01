import { getStore, getDeployStore } from "@netlify/blobs";
import { POOL, FIRST_ID, DAILY } from "./pool.mjs";

export const PLAYERS = ["mario", "veronica"];
export const MISSION_RE = /^[a-z0-9-]{3,40}$/;

// Datos reales solo en producción; en previsualizaciones, almacén aparte.
export function store(name) {
  const prod = Netlify.context?.deploy?.context === "production";
  return prod ? getStore({ name, consistency: "strong" }) : getDeployStore(name);
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

// PIN opcional: si existe la variable TRIP_PIN en Netlify, se exige para escribir.
export function pinOk(req) {
  const pin = Netlify.env.get("TRIP_PIN");
  return !pin || req.headers.get("x-trip-pin") === pin;
}

export async function readPlayer(name) {
  return ((await store("ruta-estado").get(name, { type: "json" }))) || { done: {}, secret: [] };
}

export async function writePlayer(name, data) {
  await store("ruta-estado").setJSON(name, data);
}

// ---- Misiones secretas: se desbloquean solas durante el viaje ----
export const START = new Date("2026-10-05T06:00:00+02:00").getTime();
export const END = new Date("2026-10-08T03:00:00+02:00").getTime();
export const UNLOCK_EVERY = 2 * 3600e3; // sin uso con una sola activa
export const COOLDOWN = 15 * 60e3;      // al completar la principal, la siguiente llega a los 15 min
export const MAX_ACTIVE = 1;            // una misión principal cada vez

// Fuera de producción (preview) siempre activo, para poder probar.
export function inWindow() {
  if (Netlify.context?.deploy?.context !== "production") return true;
  const n = Date.now();
  return n >= START && n <= END;
}

export function tick(pl) {
  pl.secret ||= []; pl.done ||= {};
  if (!inWindow() || pl.secret.length >= POOL.length) return false;
  const now = Date.now();
  const act = pl.secret.filter((s) => !pl.done[s.id]);
  const lastDone = Math.max(0, ...pl.secret.map((s) => pl.done[s.id]?.ts || 0));
  const lastUn = Math.max(0, ...pl.secret.map((s) => s.at));
  const due = pl.secret.length === 0
    || (act.length === 0 && now - lastDone >= COOLDOWN)
    || (act.length < MAX_ACTIVE && now - lastUn >= UNLOCK_EVERY);
  if (!due) return false;
  const used = new Set(pl.secret.map((s) => s.id));
  const free = POOL.filter((m) => !used.has(m.id));
  const first = pl.secret.length === 0 && free.find((m) => m.id === FIRST_ID);
  pl.secret.push({ ...(first || free[Math.floor(Math.random() * free.length)]), at: now });
  return true;
}

export function nextUnlock(pl) {
  const now = Date.now();
  if (!inWindow()) return now < START ? START : null;
  if (pl.secret.length >= POOL.length) return null;
  const act = pl.secret.filter((s) => !pl.done[s.id]);
  const lastDone = Math.max(0, ...pl.secret.map((s) => pl.done[s.id]?.ts || 0));
  const lastUn = Math.max(0, ...pl.secret.map((s) => s.at));
  const c = [];
  if (act.length < MAX_ACTIVE) c.push(lastUn + UNLOCK_EVERY);
  if (act.length === 0) c.push(lastDone + COOLDOWN);
  return c.length ? Math.max(now, Math.min(...c)) : null;
}

// ---- Misiones secundarias: 5 al azar por jugador y día ----
export const DAYKEYS = ["lun", "mar", "mie"];
const DAYSTART = { lun: "2026-10-05T00:00:00+02:00", mar: "2026-10-06T00:00:00+02:00", mie: "2026-10-07T00:00:00+02:00" };
export function assignDaily(pl) {
  pl.daily ||= {};
  let changed = false;
  const prod = Netlify.context?.deploy?.context === "production";
  for (const d of DAYKEYS) {
    if (pl.daily[d]) continue;
    if (prod && Date.now() < new Date(DAYSTART[d]).getTime()) continue; // en producción, cada día se abre a su hora
    if (prod && Date.now() > END) continue;
    const used = new Set(Object.values(pl.daily).flat().map((m) => m.tpl));
    const fresh = (m) => !used.has(m.id);
    const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
    const food = shuffle(DAILY.filter((m) => m.food && fresh(m)))[0] || shuffle(DAILY.filter((m) => m.food))[0];
    const rest = shuffle(DAILY.filter((m) => !m.food && fresh(m)));
    const more = rest.length >= 4 ? rest.slice(0, 4) : [...rest, ...shuffle(DAILY.filter((m) => !m.food && !rest.includes(m)))].slice(0, 4);
    pl.daily[d] = shuffle([food, ...more]).map((m) => ({ ...m, tpl: m.id, id: m.id + "-" + d, day: d }));
    changed = true;
  }
  return changed;
}

// Lo que ve quien pregunta: lo suyo completo; del rival solo lo ya cumplido.
export function view(pl, mine) {
  const daily = {};
  for (const d of Object.keys(pl.daily || {})) daily[d] = mine ? pl.daily[d] : pl.daily[d].filter((m) => pl.done[m.id]);
  if (mine) return { done: pl.done, secret: pl.secret, daily, next: nextUnlock(pl) };
  return {
    done: pl.done,
    secret: pl.secret.map((s) => (pl.done[s.id] ? s : { hidden: true })),
    daily,
  };
}

// ---- Avisos push (Web Push). Las claves VAPID se crean solas la primera vez y se guardan en Blobs. ----
import webpush from "web-push";

export async function vapid() {
  const st = store("ruta-push");
  let k = await st.get("vapid", { type: "json" });
  if (!k) { k = webpush.generateVAPIDKeys(); await st.setJSON("vapid", k); }
  return k;
}
export async function subsOf(player) { return (await store("ruta-push").get("subs-" + player, { type: "json" })) || []; }
export async function saveSub(player, sub) {
  const list = (await subsOf(player)).filter((s) => s.endpoint !== sub.endpoint);
  list.push(sub);
  await store("ruta-push").setJSON("subs-" + player, list.slice(-5));
}
export async function push(player, title, body, url = "./") {
  const subs = await subsOf(player);
  if (!subs.length) return 0;
  const k = await vapid();
  const keep = []; let sent = 0;
  for (const s of subs) {
    try {
      await webpush.sendNotification(s, JSON.stringify({ title, body, url }), {
        vapidDetails: { subject: "mailto:noreply@example.com", publicKey: k.publicKey, privateKey: k.privateKey }, TTL: 3600,
      });
      keep.push(s); sent++;
    } catch (e) { if (e.statusCode !== 404 && e.statusCode !== 410) keep.push(s); }
  }
  if (keep.length !== subs.length) await store("ruta-push").setJSON("subs-" + player, keep);
  return sent;
}

// Avanza el desbloqueo de misiones de los dos y avisa a quien reciba una nueva (salvo a quien está mirando la app ahora).
export async function advanceAll(skip) {
  const out = {};
  for (const p of PLAYERS) {
    const pl = await readPlayer(p);
    const fresh = tick(pl);
    const dd = assignDaily(pl);
    if (fresh || dd) {
      await writePlayer(p, pl);
      if (fresh && p !== skip) await push(p, "🕶️ Misión principal", "Tienes una misión nueva. Ábrela sin que te vea tu rival.");
    }
    out[p] = pl;
  }
  return out;
}
