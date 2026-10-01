import { PLAYERS, MISSION_RE, json, pinOk, readPlayer, writePlayer, store, push } from "../lib/shared.mjs";

const KEY_RE = /^(mario|veronica)\/[a-z0-9-]{3,40}\/\d{10,14}\.(jpg|mp4|webm)$/;
const MAX_BYTES = 5_600_000;
const EXT = { "image/jpeg": "jpg", "video/mp4": "mp4", "video/webm": "webm" };
const MIME = { jpg: "image/jpeg", mp4: "video/mp4", webm: "video/webm" };

// POST /api/photo?player=&mission=  (cuerpo: la foto en JPEG) → guarda la foto y completa la misión.
// GET  /api/photo?key=              → devuelve la foto.
export default async (req) => {
  const url = new URL(req.url);
  const photos = store("ruta-fotos");

  if (req.method === "GET") {
    const key = url.searchParams.get("key") || "";
    if (!KEY_RE.test(key)) return json({ error: "Foto no válida" }, 400);
    const data = await photos.get(key, { type: "arrayBuffer" });
    if (!data) return json({ error: "No existe esa foto" }, 404);
    return new Response(data, {
      headers: { "content-type": MIME[key.split(".").pop()], "cache-control": "public, max-age=31536000, immutable" },
    });
  }

  if (req.method === "POST") {
    if (!pinOk(req)) return json({ error: "PIN incorrecto" }, 401);
    const player = url.searchParams.get("player") || "";
    const mission = url.searchParams.get("mission") || "";
    if (!PLAYERS.includes(player) || !MISSION_RE.test(mission)) return json({ error: "Viajero o misión no válidos" }, 400);
    const ext = EXT[(req.headers.get("content-type") || "").split(";")[0].trim()];
    if (!ext) return json({ error: "Formato no admitido" }, 415);
    const cur = await readPlayer(player);
    if (mission.startsWith("s-") && !(cur.secret || []).some((m) => m.id === mission)) return json({ error: "Esa misión no es tuya" }, 403);
    const buf = await req.arrayBuffer();
    if (!buf.byteLength) return json({ error: "La foto está vacía" }, 400);
    if (buf.byteLength > MAX_BYTES) return json({ error: "El archivo pesa demasiado (máx. 5,5 MB)" }, 413);
    const ts = Date.now();
    const key = `${player}/${mission}/${ts}.${ext}`;
    await photos.set(key, buf);
    cur.done[mission] = { ts, photo: key };
    await writePlayer(player, cur);
    if (mission.startsWith("s-")) {
      const rival = player === "mario" ? "veronica" : "mario";
      try { await push(rival, "👀 Tu rival puntúa", "Ha cumplido una misión secreta. ¿Qué habrá sido?"); } catch {}
    }
    return json({ ok: true, key });
  }

  return json({ error: "Método no permitido" }, 405);
};

export const config = { path: "/api/photo" };
