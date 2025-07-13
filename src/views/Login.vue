<template>
  <div class="container py-5">
    <h2 class="mb-4">Login</h2>

    <form @submit.prevent="handleLogin" class="w-50 mx-auto">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="username"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>

      <button class="btn btn-primary" type="submit">Login</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3 text-center">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 如果你启用了 Pinia 状态管理，请取消注释下面一行并根据实际 store 路径修改
// import { useUserStore } from '@/store/user'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
// const userStore = useUserStore()  // 如果使用 Pinia 状态记录登录信息

function handleLogin() {
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')

  const matchedUser = storedUsers.find(
    u => u.username === username.value && u.password === password.value
  )

  if (matchedUser) {
    // userStore.login(matchedUser.username, matchedUser.role)  // 如果使用 Pinia
    localStorage.setItem('currentUser', JSON.stringify(matchedUser))  // 简单替代方案
    router.push('/dashboard')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>
