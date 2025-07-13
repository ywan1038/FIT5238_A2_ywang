<template>
  <div class="container py-5">
    <h2 class="mb-4">Register</h2>

    <form @submit.prevent="handleRegister" class="w-50 mx-auto">
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

      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select v-model="role" class="form-select">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button class="btn btn-primary" type="submit">Register</button>
    </form>

    <div v-if="success" class="alert alert-success mt-4 text-center">
      Registration successful! You can now <router-link to="/login">Login</router-link>.
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage'
}
</script>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const role = ref('user')
const success = ref(false)

function handleRegister() {
  // 获取已有用户
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  // 检查重复
  if (users.some(u => u.username === username.value)) {
    alert('❌ Username already exists!')
    return
  }

  // 保存新用户
  users.push({
    username: username.value,
    password: password.value,
    role: role.value
  })

  localStorage.setItem('users', JSON.stringify(users))
  success.value = true

  // 重置输入
  username.value = ''
  password.value = ''
  role.value = 'user'
}
</script>
