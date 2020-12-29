import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export default new Proxy(
  {
    get database() {
      return firebase.firestore();
    },
    get auth() {
      return firebase.auth();
    },
    providers: {
      get google() {
        return new firebase.auth.GoogleAuthProvider();
      },
      get facebook(){
        return new firebase.auth.FacebookAuthProvider();
      }
    },
  },
  {
    get: function(target, name) {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: "AIzaSyClGZdfEEr7zpaRettq02ib5F6AjG7W8XA",
          authDomain: "todos-5ebd4.firebaseapp.com",
          projectId: "todos-5ebd4",
          storageBucket: "todos-5ebd4.appspot.com",
          messagingSenderId: "439701340268",
          appId: "1:439701340268:web:076901630d1b7eec43d849",
        });
      }

      return target[name];
    },
  }
);
