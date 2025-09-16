import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc } from "firebase/firestore";

const {getReactNativePersistence} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyA69x3uO3GmWKgFDThmRFwZSCLpceG5zJg",
  authDomain: "tasklist-cp4.firebaseapp.com",
  projectId: "tasklist-cp4",
  storageBucket: "tasklist-cp4.firebasestorage.app",
  messagingSenderId: "270006469588",
  appId: "1:270006469588:web:f4fe1098be09c93b584c41",
  measurementId: "G-95924MJ0V0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
});

export {auth,db,getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc}
