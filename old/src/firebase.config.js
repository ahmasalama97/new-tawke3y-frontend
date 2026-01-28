// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx8xUiXwLsbBWv7nv-d3V3FzJX0YQaq9Q",
  authDomain: "tawke3y.firebaseapp.com",
  projectId: "tawke3y",
  storageBucket: "tawke3y.appspot.com",
  messagingSenderId: "462643737724",
  appId: "1:462643737724:web:b03427e47d64822642c5f9",
  measurementId: "G-1PTWLKT1LC",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
