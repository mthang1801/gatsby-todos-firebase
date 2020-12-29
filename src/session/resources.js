import firebase from "../firebase"

export default {
  signInWithGoogle : () => firebase.auth.signInWithPopup(firebase.providers.google), 
  signInWithFacebook : () => firebase.auth.signInWithPopup(firebase.providers.facebook),
  signIn : (email, password) => firebase.auth.signInWithEmailAndPassword(email, password),
  signUp : (email, password) => firebase.auth.createUserWithEmailAndPassword(email, password) , 
  signOut : () => firebase.auth.signOut(),
  onChange: callback => firebase.auth.onAuthStateChanged(callback),
  // createUserProfile : (userAuth, additionalData=null) => createUserProfileDocument(userAuth, additionalData)
}