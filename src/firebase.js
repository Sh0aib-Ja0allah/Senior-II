import { initializeApp } from "firebase/app"
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyABawFFxf1Y8CrAi1esWeXqzMkewyOOGLg",
  authDomain: "reactjs-esp32.firebaseapp.com",
  databaseURL: "https://reactjs-esp32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactjs-esp32",
  storageBucket: "reactjs-esp32.appspot.com",
  messagingSenderId: "745742871383",
  appId: "1:745742871383:web:e454cd1214f12acba0ac12"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)