import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCESeGiwdmN9yAPK151D-jD8uJ1yH2qsTw",
    authDomain: "moliver-6a572.firebaseapp.com",
    projectId: "moliver-6a572",
    storageBucket: "moliver-6a572.appspot.com",
    messagingSenderId: "794630574596",
    appId: "1:794630574596:web:f7b0a5cacdf23731409b51",
    measurementId: "G-VHLPL6RREN"
})