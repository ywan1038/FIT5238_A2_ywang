<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Role</label>
        <select v-model="role" class="form-select">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button class="btn btn-success" type="submit">Register</button>
    </form>
    <p class="mt-3 text-success" v-if="success">Registration successful! You can now login.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const role = ref('user')
const success = ref(false)

function handleRegister() {
  let users = JSON.parse(localStorage.getItem('users') || '[]')

  if (users.some(u => u.username === username.value)) {
    alert('Username already exists')
    return
  }

  users.push({
    username: username.value,
    password: password.value,
    role: role.value
  })

  localStorage.setItem('users', JSON.stringify(users))
  success.value = true
  username.value = ''
  password.value = ''
  role.value = 'user'
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
