// Misiones principales (secretas, de una en una). {r} = el rival.
// Para añadir una: id único que empiece por "s-" (a-z, 0-9, guiones, máx. 40), kind "photo" o "video", xp, short y t.
// sticker: emoji que la app pega sobre la foto (opcional). La primera de cada jugador siempre es FIRST_ID.
export const FIRST_ID = "s-durmiendo";
export const POOL = [
  { id: "s-durmiendo", kind: "photo", xp: 200, short: "Rival dormido", t: "Hazle una foto a {r} durmiendo." },
  { id: "s-muneco", kind: "photo", xp: 180, short: "Rival con muñeco dormilón", t: "Fotografía a {r} con los ojos cerrados. La app le pega un muñeco dormilón.", sticker: "😴" },
  { id: "s-video-sigilo", kind: "video", xp: 180, short: "Vídeo sigiloso", t: "Graba un vídeo de {r} sin que te vea." },
  { id: "s-fuente", kind: "video", xp: 170, short: "Bebiendo en la fuente", t: "Graba a {r} bebiendo de la fuente de la capilla." },
  { id: "s-bailando", kind: "video", xp: 170, short: "Rival bailando", t: "Consigue que {r} baile 5 segundos y grábalo." },
  { id: "s-video-grito", kind: "video", xp: 160, short: "Grito de montaña", t: "Graba a {r} gritando algo a la montaña." },
  { id: "s-imitacion", kind: "video", xp: 160, short: "Imitación", t: "Graba a {r} imitando a una vaca asturiana." },
  { id: "s-sidra", kind: "video", xp: 150, short: "Escanciando sidra", t: "Graba a {r} escanciando sidra (o intentándolo)." },
  { id: "s-desprevenido", kind: "photo", xp: 140, short: "Rival desprevenido", t: "Hazle una foto a {r} sin que se dé cuenta." },
  { id: "s-reflejo", kind: "photo", xp: 130, short: "Reflejo", t: "Foto de {r} reflejado en el agua de un lago o río." },
  { id: "s-comiendo", kind: "photo", xp: 120, short: "Rival comiendo", t: "Foto a {r} con la boca llena." },
  { id: "s-pose", kind: "photo", xp: 120, short: "Pose épica", t: "Haz que {r} pose como un explorador legendario y dispara." },
  { id: "s-selfie-raro", kind: "photo", xp: 120, short: "Selfie raro", t: "Selfie con {r} poniendo la peor cara posible." },
  { id: "s-espalda", kind: "photo", xp: 120, short: "De espaldas", t: "Foto a {r} de espaldas mirando el paisaje." },
  { id: "s-sombra", kind: "photo", xp: 110, short: "Sombra", t: "Foto a la sombra de {r} haciendo algo ridículo." },
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
];
