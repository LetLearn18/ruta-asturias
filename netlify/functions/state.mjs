import { PLAYERS, MISSION_RE, json, pinOk, readPlayer, writePlayer, advanceAll, view } from "../lib/shared.mjs";

// GET ?me=mario|veronica: progreso (del rival solo lo ya cumplido). POST: marcar una misión normal.
export default async (req) => {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const me = url.searchParams.get("me");
    const all = await advanceAll(me);
    const players = {};
    for (const p of PLAYERS) players[p] = view(all[p], p === me);
    return json({ players, pinRequired: !!Netlify.env.get("TRIP_PIN"), now: Date.now() });
  }
  if (req.method === "POST") {
    if (!pinOk(req)) return json({ error: "PIN incorrecto" }, 401);
    let body;
    try { body = await req.json(); } catch { return json({ error: "Petición no válida" }, 400); }
    if (body?.check) return json({ ok: true });
    const { player, mission, done } = body || {};
    if (!PLAYERS.includes(player) || !MISSION_RE.test(mission || "") || mission.startsWith("s-")) return json({ error: "Viajero o misión no válidos" }, 400);
    const cur = await readPlayer(player);
    if (done) cur.done[mission] = { ...(cur.done[mission] || {}), ts: Date.now() };
    else delete cur.done[mission];
    await writePlayer(player, cur);
    return json({ ok: true });
  }
  return json({ error: "Método no permitido" }, 405);
};

export const config = { path: "/api/state" };
