var C="req-v16";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","./index.html"])}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);
  if(!(u.origin===location.origin||u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com"))return;
  e.respondWith(fetch(r,{cache:"no-cache"}).then(function(res){if(res&&(res.ok||res.type==="opaque")){var cp=res.clone();caches.open(C).then(function(c){return c.put(r,cp)}).catch(function(){})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||(r.mode==="navigate"?caches.match("./index.html"):Response.error())})}))});
