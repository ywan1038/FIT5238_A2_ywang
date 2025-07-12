// src/store/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    username: '',
    role: 'guest' // guest, user, admin
  }),
  actions: {
    login(username, role = 'user') {
      this.isAuthenticated = true
      this.username = username
      this.role = role
    },
    logout() {
      this.isAuthenticated = false
      this.username = ''
      this.role = 'guest'
    }
  }
})
