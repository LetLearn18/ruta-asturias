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
