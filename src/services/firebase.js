// src/services/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: 替换为你在 Firebase 控制台创建 Web App 后得到的配置
const firebaseConfig = {
  apiKey: "AIzaSyBKPcrLexw_xyWi6zIX2dVCbs4HNnr53vc",
  authDomain: "week7-yichen-wang.firebaseapp.com",
  projectId: "week7-yichen-wang",
  storageBucket: "week7-yichen-wang.firebasestorage.app",
  messagingSenderId: "969951899315",
  appId: "1:969951899315:web:f0bd0652e1ea5955eacac6"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
