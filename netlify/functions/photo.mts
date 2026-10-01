import type { Config } from "@netlify/functions";
import { PLAYERS, MISSION_RE, json, pinOk, readPlayer, writePlayer, store } from "../lib/shared.mts";

const KEY_RE = /^(mario|veronica)\/[a-z0-9-]{3,40}\/\d{10,14}\.jpg$/;
const MAX_BYTES = 4_500_000;

// POST /api/photo?player=&mission=  (cuerpo: la foto en JPEG) → guarda la foto y completa la misión.
// GET  /api/photo?key=              → devuelve la foto.
export default async (req: Request) => {
  const url = new URL(req.url);
  const photos = store("ruta-fotos");

  if (req.method === "GET") {
    const key = url.searchParams.get("key") || "";
    if (!KEY_RE.test(key)) return json({ error: "Foto no válida" }, 400);
    const data = await photos.get(key, { type: "arrayBuffer" });
    if (!data) return json({ error: "No existe esa foto" }, 404);
    return new Response(data, {
      headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=31536000, immutable" },
    });
  }

  if (req.method === "POST") {
    if (!pinOk(req)) return json({ error: "PIN incorrecto" }, 401);
    const player = url.searchParams.get("player") || "";
    const mission = url.searchParams.get("mission") || "";
    if (!PLAYERS.includes(player) || !MISSION_RE.test(mission)) return json({ error: "Viajero o misión no válidos" }, 400);
    const buf = await req.arrayBuffer();
    if (!buf.byteLength) return json({ error: "La foto está vacía" }, 400);
    if (buf.byteLength > MAX_BYTES) return json({ error: "La foto pesa demasiado (máx. 4,5 MB)" }, 413);
    const ts = Date.now();
    const key = `${player}/${mission}/${ts}.jpg`;
    await photos.set(key, buf);
    const cur = await readPlayer(player);
    cur.done[mission] = { ts, photo: key };
    await writePlayer(player, cur);
    return json({ ok: true, key, player: cur });
  }

  return json({ error: "Método no permitido" }, 405);
};

export const config: Config = { path: "/api/photo" };
