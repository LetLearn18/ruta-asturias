const C="ruta-asturias-v4";
const CORE=["./","index.html","clasico.html","manifest.webmanifest","icon-192.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;if(new URL(r.url).pathname.startsWith("/api/"))return;
  const u=new URL(r.url);
  if(u.origin===location.origin){ // red primero, caché si no hay cobertura
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
  } else if(/wikimedia|cdnjs|fonts\.(googleapis|gstatic)/.test(u.host)){ // fotos, fuentes y mapa: caché primero
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})));
  }
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||"./";
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if("navigate" in c){return c.navigate(url).then(w=>(w||c).focus())}}
    return self.clients.openWindow(url);
  }));
});
self.addEventListener("push",e=>{
  let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||"Expedición Asturias",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",tag:d.tag||"exp",data:{url:d.url||"./"}}));
});
