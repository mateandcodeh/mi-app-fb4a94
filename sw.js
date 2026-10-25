const C='app-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{
    if(r.ok&&new URL(e.request.url).origin===self.location.origin){
      const c=r.clone();caches.open(C).then(cc=>cc.put(e.request,c));
    }
    return r;
  }).catch(()=>caches.match('./index.html'))));
});