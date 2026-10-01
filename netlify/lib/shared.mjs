import { getStore, getDeployStore } from "@netlify/blobs";

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
  return ((await store("ruta-estado").get(name, { type: "json" }))) || { done: {} };
}

export async function writePlayer(name, data) {
  await store("ruta-estado").setJSON(name, data);
}
