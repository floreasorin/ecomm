import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC2N5WvmpxY8MUD-3A_9AJkZmv-lnBYgJI",
  authDomain: "crwn-db-20f59.firebaseapp.com",
  databaseURL: "https://crwn-db-20f59.firebaseio.com",
  projectId: "crwn-db-20f59",
  storageBucket: "crwn-db-20f59.appspot.com",
  messagingSenderId: "428052279522",
  appId: "1:428052279522:web:224afff0c988163967aebb",
  measurementId: "G-P578Q74M80",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
