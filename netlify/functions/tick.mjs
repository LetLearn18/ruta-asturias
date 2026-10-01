import { advanceAll } from "../lib/shared.mjs";

// Cada 10 minutos: desbloquea misiones y avisa aunque nadie tenga la app abierta (solo en producción).
export default async () => { await advanceAll(null); return new Response("ok"); };
export const config = { schedule: "*/10 * * * *" };
