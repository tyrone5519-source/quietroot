/* Quietroot service worker.
   For now it only handles notification taps. Offline caching gets added when packaging for the Play Store. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const go = (e.notification.data && e.notification.data.go) || "home";
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const w of wins) {
      if ("focus" in w) { await w.focus(); w.postMessage({ go }); return; }
    }
    await self.clients.openWindow("./#" + go);
  })());
});
