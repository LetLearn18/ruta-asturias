// Misiones principales (secretas, de una en una). {r} = el rival.
// Para añadir una: id único que empiece por "s-" (a-z, 0-9, guiones, máx. 40), kind "photo" o "video", xp, short y t.
// sticker: emoji que la app pega sobre la foto (opcional). La primera de cada jugador siempre es FIRST_ID.
export const FIRST_ID = null; // si pones un id, será la primera principal de cada jugador
// win: [[inicio, fin], ...]. Misión de evento (durmiendo: noches del lunes y martes; tren: ida y vuelta): solo se reparte si en ese momento estás en esa franja
// (extra, no cuenta como la principal en curso) y caduca al terminar si no se cumple.
export const POOL = [
  { id: "s-durmiendo-lun", kind: "photo", xp: 200, short: "Rival dormido (lunes)", t: "Es de noche: hazle una foto a {r} durmiendo.", win: [["2026-10-05T23:00:00+02:00", "2026-10-06T08:00:00+02:00"]] },
  { id: "s-durmiendo-mar", kind: "photo", xp: 200, short: "Rival dormido (martes)", t: "Es de noche: hazle una foto a {r} durmiendo.", win: [["2026-10-06T23:00:00+02:00", "2026-10-07T08:00:00+02:00"]] },
  { id: "s-lagos", kind: "video", xp: 180, short: "Rival en los lagos", t: "Graba un vídeo donde se vean {r} y los lagos de Covadonga." },
  { id: "s-andando", kind: "video", xp: 160, short: "Rival andando", t: "Graba a {r} andando sin que se dé cuenta." },
  { id: "s-tren", kind: "photo", xp: 130, short: "Rival en el tren", t: "Hazle una foto a {r} en el tren.", win: [["2026-10-05T09:15:00+02:00", "2026-10-05T12:44:00+02:00"], ["2026-10-07T18:56:00+02:00", "2026-10-07T22:25:00+02:00"]] },
  { id: "s-fuente", kind: "video", xp: 170, short: "Bebiendo en la fuente", t: "Graba a {r} bebiendo de la fuente de la capilla." },
  { id: "s-desprevenido", kind: "photo", xp: 140, short: "Rival desprevenido", t: "Hazle una foto a {r} sin que se dé cuenta." },
  { id: "s-sombras-juntas", kind: "photo", xp: 130, short: "Sombras juntas", t: "Foto de vuestras dos sombras juntas." },
  { id: "s-historico", kind: "photo", xp: 140, short: "Algo histórico", t: "Foto de algo histórico de la zona donde estéis." },
  { id: "s-puente-rival", kind: "photo", xp: 120, short: "Cruzando el puente", t: "Foto de {r} cruzando el Puente Romano de Cangas." },
  { id: "s-basilica", kind: "photo", xp: 130, short: "Ante la basílica", t: "Foto de {r} mirando la basílica de Covadonga." },
  { id: "s-estatua", kind: "photo", xp: 150, short: "Imitando una estatua", t: "Foto de {r} imitando la pose de una estatua de Oviedo." },
  { id: "s-reflejo", kind: "photo", xp: 130, short: "Reflejo", t: "Foto de {r} reflejado en el agua de un lago o río." },
  { id: "s-espalda", kind: "photo", xp: 120, short: "De espaldas", t: "Foto a {r} de espaldas mirando el paisaje." },
];

// Misiones secundarias: cada día cada jugador recibe 5 al azar (1 de comida + 4 más), distintas para cada uno.
// id único que empiece por "d-"; food: cuenta como comida. Se les añade "-lun", "-mar" o "-mie" automáticamente.
export const DAILY = [
  { id: "d-desayuno", kind: "photo", xp: 40, food: true, short: "Desayuno", t: "Foto del desayuno." },
  { id: "d-comida", kind: "photo", xp: 40, food: true, short: "Comida", t: "Foto de la comida." },
  { id: "d-cena", kind: "photo", xp: 40, food: true, short: "Cena", t: "Foto de la cena." },
  { id: "d-cafe", kind: "photo", xp: 40, food: true, short: "Bebida del día", t: "Foto de tu café, sidra o bebida del día." },
  { id: "d-atardecer", kind: "photo", xp: 60, short: "Atardecer", t: "Foto del atardecer." },
  { id: "d-especial", kind: "video", xp: 80, short: "Sitio especial", t: "Vídeo de un sitio muy especial." },
  { id: "d-detalle", kind: "photo", xp: 50, short: "Detalle", t: "Foto a un detalle que casi nadie vería." },
  { id: "d-selfie", kind: "photo", xp: 50, short: "Selfie con paisaje", t: "Selfie con un paisaje bonito de fondo." },
  { id: "d-animal", kind: "photo", xp: 60, short: "Animal", t: "Foto a un animal." },
  { id: "d-caminando", kind: "video", xp: 70, short: "Vídeo caminando", t: "Vídeo caminando por donde estés." },
  { id: "d-sonido", kind: "video", xp: 70, short: "Mejor sonido", t: "Vídeo con el mejor sonido del lugar (agua, viento, campanas…)." },
  { id: "d-sonrisa", kind: "photo", xp: 60, short: "Rival sonriendo", t: "Foto de {r} sonriendo." },
  { id: "d-puente", kind: "photo", xp: 50, short: "Un puente", t: "Foto a un puente." },
  { id: "d-montana", kind: "photo", xp: 50, short: "La montaña", t: "Foto de la montaña más bonita que veas." },
  { id: "d-pareja", kind: "photo", xp: 70, short: "Los dos juntos", t: "Foto de los dos juntos." },
  { id: "d-cielo", kind: "photo", xp: 40, short: "El cielo", t: "Foto al cielo o a las nubes." },
  { id: "d-calle", kind: "photo", xp: 50, short: "Calle bonita", t: "Foto a la calle o rincón más bonito que veas." },
  { id: "d-azul", kind: "photo", xp: 50, short: "Algo azul", t: "Foto de lo más azul que encuentres." },
  { id: "d-verde", kind: "photo", xp: 50, short: "Algo verde", t: "Foto de lo más verde que veas." },
  { id: "d-iconico", kind: "photo", xp: 70, short: "Lo más icónico", t: "Foto de lo más icónico del lugar donde estés." },
];
