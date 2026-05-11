importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCFvaxdh12CBWWlIfQYY6jFh4Sy9MPTseY",
  authDomain: "multimedia-y-sonido.firebaseapp.com",
  databaseURL: "https://multimedia-y-sonido-default-rtdb.firebaseio.com",
  projectId: "multimedia-y-sonido",
  storageBucket: "multimedia-y-sonido.firebasestorage.app",
  messagingSenderId: "131844028034",
  appId: "1:131844028034:web:f2f4d899aae823655be69b",
  measurementId: "G-Q21ZJXMG92"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje background:', payload);
  const title = payload?.notification?.title || payload?.data?.title || 'IPUIE Coca Norte';
  const options = {
    body: payload?.notification?.body || payload?.data?.body || 'Tienes una nueva notificación.',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: payload?.data || { url: './' }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if ('navigate' in client) client.navigate(url);
          return;
        }
      }
      return clients.openWindow(url);
    })
  );
});
