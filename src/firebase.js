import firebase, { firestore } from "firebase/app";

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
    async createUserProfile(userAuth, additionalData=null){
      if(!userAuth) return ;
      const userRef = this.database.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      if(!snapShot.exists){
        const {displayName, email} = userAuth; 
        try {
          await userRef.set({
            displayName : displayName || email.split("@")[0],
            email,
            ...additionalData,
            createdAt : new Date().toLocaleString()
          })
        } catch (error) {
          console.log("Creating user error: " + error.message)
        }        
      }
      return userRef;
    }
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
