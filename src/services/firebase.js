// src/services/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBKPcrLexw_xyWi6zIX2dVCbs4HNnr53vc",
  authDomain: "week7-yichen-wang.firebaseapp.com",
  projectId: "week7-yichen-wang",
  storageBucket: "week7-yichen-wang.firebasestorage.app",
  messagingSenderId: "969951899315",
  appId: "1:969951899315:web:f0bd0652e1ea5955eacac6"
}

// 初始化 App
const app = initializeApp(firebaseConfig)

// 导出认证模块
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// 导出 Firestore 数据库（供仪表盘、预约等功能使用）
export const db = getFirestore(app)
