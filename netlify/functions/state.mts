import type { Config } from "@netlify/functions";
import { PLAYERS, MISSION_RE, json, pinOk, readPlayer, writePlayer } from "../lib/shared.mts";

// GET: progreso de los dos viajeros. POST: marcar o desmarcar una misión propia.
export default async (req: Request) => {
  if (req.method === "GET") {
    const players: Record<string, unknown> = {};
    for (const p of PLAYERS) players[p] = await readPlayer(p);
    return json({ players, pinRequired: !!Netlify.env.get("TRIP_PIN") });
  }
  if (req.method === "POST") {
    if (!pinOk(req)) return json({ error: "PIN incorrecto" }, 401);
    let body: any;
    try { body = await req.json(); } catch { return json({ error: "Petición no válida" }, 400); }
    const { player, mission, done } = body || {};
    if (!PLAYERS.includes(player) || !MISSION_RE.test(mission || "")) return json({ error: "Viajero o misión no válidos" }, 400);
    const cur = await readPlayer(player);
    if (done) cur.done[mission] = { ...(cur.done[mission] || {}), ts: Date.now() };
    else delete cur.done[mission];
    await writePlayer(player, cur);
    return json({ ok: true, player: cur });
  }
  return json({ error: "Método no permitido" }, 405);
};

export const config: Config = { path: "/api/state" };
