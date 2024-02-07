import { initializeApp, } from "@firebase/app"; 
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAS8ccn4bRrW5IBCdO7uklOj3MeWTr7_Xs",
    authDomain: "fir-eae8a.firebaseapp.com",
    projectId: "fir-eae8a",
    storageBucket: "fir-eae8a.appspot.com",
    messagingSenderId: "779948425572",
    appId: "1:779948425572:web:b38dc87cbaa42e264d3a71",
    measurementId: "G-9GGN8M4LVQ"
  };
 
const app = initializeApp(firebaseConfig); 

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);
export {db,auth,storage}