import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0o6P6aToXEJ-GVRBLB8sgW1Xm8V4Qh74",
  authDomain: "messenger-clone-3040a.firebaseapp.com",
  databaseURL: "https://messenger-clone-3040a.firebaseio.com",
  projectId: "messenger-clone-3040a",
  storageBucket: "messenger-clone-3040a.appspot.com",
  messagingSenderId: "802462658186",
  appId: "1:802462658186:web:ae4ab2dc458c927d630773",
  measurementId: "G-XX6C2PQ46Z",
});

const db = firebaseApp.firestore();

export default db;