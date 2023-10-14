// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { browserSessionPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-XWCcbXsjayA0EmlKn3RAaOTJkytlRlQ",
  authDomain: "vewrite-new.firebaseapp.com",
  projectId: "vewrite-new",
  storageBucket: "vewrite-new.appspot.com",
  messagingSenderId: "841115455116",
  appId: "1:841115455116:web:202c070780202e68a9f5a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const postsCollection = collection(db, "posts");

// setPersistence(auth, browserSessionPersistence);

export { auth, provider, db, postsCollection };
