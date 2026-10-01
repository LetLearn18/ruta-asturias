import { getStore, getDeployStore } from "@netlify/blobs";
import { POOL } from "./pool.mjs";

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
export const UNLOCK_EVERY = 2 * 3600e3; // una nueva cada 2 h aunque no hayas acabado la anterior
export const COOLDOWN = 5 * 60e3;       // al completar la última, otra a los 5 min
export const MAX_ACTIVE = 3;

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
  pl.secret.push({ ...free[Math.floor(Math.random() * free.length)], at: now });
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

// Lo que ve quien pregunta: lo suyo completo; del rival solo lo ya cumplido.
export function view(pl, mine) {
  if (mine) return { done: pl.done, secret: pl.secret, next: nextUnlock(pl) };
  return {
    done: pl.done,
    secret: pl.secret.map((s) => (pl.done[s.id] ? s : { hidden: true })),
  };
}
