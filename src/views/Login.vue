<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p class="mt-3 text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

function handleLogin() {
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
  const user = storedUsers.find(u => u.username === username.value && u.password === password.value)

  if (user) {
    userStore.login(user.username, user.role || 'user')
    router.push('/dashboard')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
