import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDmW-Lz6079bb3Fi9GZwtKJrcgBuM2-7v0",
  authDomain: "real-time-chat-app-e7db8.firebaseapp.com",
  projectId: "real-time-chat-app-e7db8",
  storageBucket: "real-time-chat-app-e7db8.appspot.com",
  messagingSenderId: "341834980647",
  appId: "1:341834980647:web:302c4e6f946de69b241d02",
  measurementId: "G-6XRPMEQWPZ",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
