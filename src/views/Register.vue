<template>
  <div class="container py-5" style="max-width:560px">
    <h2 class="mb-4">Register</h2>

    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100" type="submit">Create Account</button>
    </form>

    <div v-if="success" class="alert alert-success mt-4 text-center">
      Registration successful! You can now <router-link to="/login">Login</router-link>.
    </div>
    <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'

const email = ref('')
const password = ref('')
const success = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    success.value = true
    email.value = ''
    password.value = ''
  } catch (e) {
    error.value = e.message
  }
}
</script>
