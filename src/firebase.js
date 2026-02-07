import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFflxhgjSJIX2dlCAxEQDMHsd69wf8RxI",
  authDomain: "netflix-clone-1b1a7.firebaseapp.com",
  projectId: "netflix-clone-1b1a7",
  storageBucket: "netflix-clone-1b1a7.firebasestorage.app",
  messagingSenderId: "552701535941",
  appId: "1:552701535941:web:89f82cd214ae13f6d9f2ac",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const logout = () => {
  signOut(auth);
}

export { auth, db, signup, login, logout };