// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCESeGiwdmN9yAPK151D-jD8uJ1yH2qsTw",
    authDomain: "moliver-6a572.firebaseapp.com",
    projectId: "moliver-6a572",
    storageBucket: "moliver-6a572.appspot.com",
    messagingSenderId: "794630574596",
    appId: "1:794630574596:web:f7b0a5cacdf23731409b51",
    measurementId: "G-VHLPL6RREN"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()


export {auth}