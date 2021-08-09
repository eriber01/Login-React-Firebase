import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBPRxsmUWMlpYytPkvg91FARS2ABK7PSWo",
    authDomain: "login-react-a66f8.firebaseapp.com",
    projectId: "login-react-a66f8",
    storageBucket: "login-react-a66f8.appspot.com",
    messagingSenderId: "942319067781",
    appId: "1:942319067781:web:024cebd2b74ad462b8ffec",
    measurementId: "G-TSGZPWKG7V"
};
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()

export {auth}