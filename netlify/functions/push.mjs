import { PLAYERS, json, pinOk, vapid, saveSub } from "../lib/shared.mjs";

// GET → clave pública. POST {player, subscription} → guarda el móvil para los avisos.
export default async (req) => {
  if (req.method === "GET") return json({ key: (await vapid()).publicKey });
  if (req.method === "POST") {
    if (!pinOk(req)) return json({ error: "PIN incorrecto" }, 401);
    let b; try { b = await req.json(); } catch { return json({ error: "Petición no válida" }, 400); }
    if (!PLAYERS.includes(b?.player) || !b?.subscription?.endpoint) return json({ error: "Datos no válidos" }, 400);
    await saveSub(b.player, b.subscription);
    return json({ ok: true });
  }
  return json({ error: "Método no permitido" }, 405);
};
export const config = { path: "/api/push" };
