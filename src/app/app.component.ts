import { Component, OnInit } from '@angular/core';
import { configuration, environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hello world';
  appVersion: string | undefined;
  environment: string | undefined;
  firebaseMessagingToken: string | undefined;

  ngOnInit(): void {
    this.environment = (environment.production ? "Production" : "Development");
    this.appVersion = environment.version;

    const firebaseApp = initializeApp(configuration.firebase);
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: 'BCSCYjToGLq2XwsbbS-TcQQn4jUvjb28ZAQHQgf99WR5h1DFGvrkJnmIPEwUpxdpbWlK62E-JtiAAhpCw08tJM8' }).then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        this.firebaseMessagingToken = currentToken;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

    navigator.serviceWorker.addEventListener('message', function(event) {
      const message = event.data;
      if (message.origin === 'Service-Worker') {
        console.log(message);
      }
    });

  }
}
