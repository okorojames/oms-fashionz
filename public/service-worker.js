self.addEventListener("install", (event) => {
  console.log(event?.type);
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.", event);
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(fetch(event.request));
});
