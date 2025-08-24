// src/store/user.js
import { defineStore } from 'pinia'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/services/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    username: '',
    role: 'guest',     // 可扩展：'guest' | 'user' | 'admin'
    uid: null
  }),
  actions: {
    bindAuthListener() {
      // 只绑定一次
      if (this._bound) return
      this._bound = true
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isAuthenticated = true
          this.username = user.email || user.displayName || 'User'
          this.uid = user.uid
          // 这里也可以从你的数据库拉取角色；现阶段默认 'user'
          if (this.role === 'guest') this.role = 'user'
        } else {
          this.isAuthenticated = false
          this.username = ''
          this.uid = null
          this.role = 'guest'
        }
      })
    },
    async logout() {
      await signOut(auth)
    },
    // 可选：设置角色（若后续接入后台或 Firestore）
    setRole(role) {
      this.role = role
    }
  }
})
