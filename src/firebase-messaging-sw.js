const firebaseConfig = {
  apiKey: "AIzaSyAbY_wnHWKj1wcvy2uY8gVVcWdXXK6Lcq8",
  authDomain: "copap-72664.firebaseapp.com",
  projectId: "copap-72664",
  storageBucket: "copap-72664.appspot.com",
  messagingSenderId: "74738016837",
  appId: "1:74738016837:web:edbea716dd8b5ec994792c",
  measurementId: "G-FFX0QRS8Z6"
}


self.onnotificationclick = function(event) {
  const notificationData = event.notification;
  const dataCustom = JSON.parse(notificationData.data);

  event.notification.close();

  event.waitUntil(self.clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(function(clientList) {
    let _client;
    // for (let client of clientList) {
    //   if ('focus' in client) {
    //     _client = client;
    //     break;
    //
    //   }
    // }
    if (clientList.length !== 0) {
      _client = clientList[0];
    }

    if (_client) {
      _client.postMessage({...dataCustom, origin: 'Service-Worker'});
      return _client.focus();
    }

    if (self.clients.openWindow) {
      return self.clients.openWindow(dataCustom.focus)
        .then(client => {
          client.postMessage({...dataCustom, origin: 'Service-Worker'});
          return client;
        })
    }

  }));
};

if (ServiceWorkerRegistration && "pushManager" in ServiceWorkerRegistration.prototype) {

  importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const payloadData = payload.data;

    const notificationTitle = payloadData.title;
    const notificationOptions = {
      body: payloadData.body,
      icon: payloadData.icon,
      vibrate: payloadData.vibrate,
      tag: payloadData.tag,
      data: payloadData.other
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });


}
