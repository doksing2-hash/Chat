// Service Worker для push-уведомлений
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB0Sl7eXrToA29GY4F2kvd6di-EqnIM9Fo",
  authDomain: "my-chat-364f9.firebaseapp.com",
  databaseURL: "https://my-chat-364f9-default-rtdb.firebaseio.com",
  projectId: "my-chat-364f9",
  storageBucket: "my-chat-364f9.firebasestorage.app",
  messagingSenderId: "741262322216",
  appId: "1:741262322216:web:71d543eca228567a0da31d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Новое сообщение';
  const body = payload.notification?.body || '';
  self.registration.showNotification(title, {
    body: body,
    icon: 'https://doksing2-hash.github.io/Chat/icon.png',
    badge: 'https://doksing2-hash.github.io/Chat/icon.png'
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('doksing2-hash.github.io') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('https://doksing2-hash.github.io/Chat/');
    })
  );
});
