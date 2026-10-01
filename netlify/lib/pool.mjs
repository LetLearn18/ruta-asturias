// Misiones principales (secretas, de una en una). {r} = el rival.
// Para añadir una: id único que empiece por "s-" (a-z, 0-9, guiones, máx. 40), kind "photo" o "video", xp, short y t.
// sticker: emoji que la app pega sobre la foto (opcional). La primera de cada jugador siempre es FIRST_ID.
export const FIRST_ID = null; // si pones un id, será la primera principal de cada jugador
// days: ["mar"] = solo se reparte ese día (los lagos son el martes).
// win: [[inicio, fin], ...]. Misión de evento (durmiendo: noches del lunes y martes; tren: ida y vuelta): solo se reparte si en ese momento estás en esa franja
// (extra, no cuenta como la principal en curso) y caduca al terminar si no se cumple.
export const POOL = [
  // EVENTOS: franjas fijas (tren y noches). A quién le toca cada uno se sortea al azar una vez, a partes iguales (2 y 2).
  { id: "s-tren-ida", kind: "photo", xp: 130, short: "Rival en el tren (ida)", t: "Hazle una foto a {r} en el tren.", win: [["2026-10-05T09:15:00+02:00", "2026-10-05T12:44:00+02:00"]] },
  { id: "s-tren-vuelta", kind: "photo", xp: 130, short: "Rival en el tren (vuelta)", t: "Hazle una foto a {r} en el tren.", win: [["2026-10-07T18:56:00+02:00", "2026-10-07T22:25:00+02:00"]] },
  { id: "s-durmiendo-lun", kind: "photo", xp: 200, short: "Rival dormido (lunes)", t: "Es de noche: hazle una foto a {r} durmiendo.", win: [["2026-10-05T23:00:00+02:00", "2026-10-06T08:00:00+02:00"]] },
  { id: "s-durmiendo-mar", kind: "photo", xp: 200, short: "Rival dormido (martes)", t: "Es de noche: hazle una foto a {r} durmiendo.", win: [["2026-10-06T23:00:00+02:00", "2026-10-07T08:00:00+02:00"]] },
  { id: "s-lagos", days: ["mar"], kind: "video", xp: 180, short: "Rival en los lagos", t: "Graba un vídeo donde se vean {r} y los lagos de Covadonga." },
  { id: "s-andando", kind: "video", xp: 160, short: "Rival andando", t: "Graba a {r} andando sin que se dé cuenta." },
  { id: "s-plato", kind: "video", xp: 170, short: "Primer bocado", t: "Graba a {r} probando un plato asturiano que no haya probado antes." },
  { id: "s-monte", kind: "video", xp: 140, short: "Hacia la montaña", t: "Graba a {r} caminando de espaldas hacia la montaña, como en una película." },
  { id: "s-fuente", kind: "video", xp: 170, short: "Bebiendo en la fuente", t: "Graba a {r} bebiendo de la fuente de la capilla." },
  { id: "s-desprevenido", kind: "photo", xp: 140, short: "Rival desprevenido", t: "Hazle una foto a {r} sin que se dé cuenta." },
  { id: "s-sombras-juntas", kind: "photo", xp: 130, short: "Sombras juntas", t: "Foto de vuestras dos sombras juntas." },
  { id: "s-historico", kind: "photo", xp: 140, short: "Algo histórico", t: "Foto de algo histórico de la zona donde estéis." },
  { id: "s-ventana", kind: "video", xp: 140, short: "Ventana del bus", t: "Graba a {r} mirando por la ventana del bus." },
  { id: "s-sidra-rival", kind: "photo", xp: 120, short: "Sidra en mano", t: "Foto de {r} con un vaso de sidra en la mano." },
  { id: "s-brindis", kind: "photo", xp: 130, short: "Brindis", t: "Foto de {r} brindando, sin avisar." },
  { id: "s-reflejo", kind: "photo", xp: 130, short: "Reflejo", t: "Foto de {r} reflejado en el agua de un lago o río." },
];

// Misiones secundarias: cada día cada jugador recibe 4 al azar (1 de comida + 3 más), distintas entre los dos jugadores.
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
  { id: "d-sonido", kind: "video", xp: 70, short: "Mejor sonido", t: "Vídeo con el mejor sonido del lugar (agua, viento, campanas…)." },
  { id: "d-sonrisa", kind: "photo", xp: 60, short: "Rival sonriendo", t: "Foto de {r} sonriendo." },
  { id: "d-montana", kind: "photo", xp: 50, short: "La montaña", t: "Foto de la montaña más bonita que veas." },
  { id: "d-pareja", kind: "photo", xp: 70, short: "Los dos juntos", t: "Foto de los dos juntos." },
  { id: "d-cielo", kind: "photo", xp: 40, short: "El cielo", t: "Foto al cielo o a las nubes." },
  { id: "d-calle", kind: "photo", xp: 50, short: "Calle bonita", t: "Foto a la calle o rincón más bonito que veas." },
  { id: "d-azul", kind: "photo", xp: 50, short: "Algo azul", t: "Foto de lo más azul que encuentres." },
  { id: "d-verde", kind: "photo", xp: 50, short: "Algo verde", t: "Foto de lo más verde que veas." },
  { id: "d-iconico", kind: "photo", xp: 70, short: "Lo más icónico", t: "Foto de lo más icónico del lugar donde estés." },
  { id: "d-raro", kind: "photo", xp: 60, short: "Algo que no encaja", t: "Foto de algo que no encaja: lo más raro o fuera de lugar que veas." },
  { id: "d-pies", kind: "photo", xp: 50, short: "Tus pies", t: "Foto de tus pies en el sitio más bonito en el que estés." },
  { id: "d-pequeno-grande", kind: "photo", xp: 60, short: "Pequeño y grande", t: "Foto de lo más pequeño y lo más grande que veas, en una misma foto." },
  { id: "d-puerta", kind: "photo", xp: 50, short: "Puerta con encanto", t: "Foto de una puerta o ventana con encanto." },
  { id: "d-olor", kind: "photo", xp: 50, short: "Huele increíble", t: "Foto de algo que huela increíble (un mercado, una panadería, una sidrería)." },
  { id: "d-movimiento", kind: "video", xp: 70, short: "Algo en movimiento", t: "Vídeo de 10 segundos de algo en movimiento (agua, nubes, gente, un animal)." },
];
