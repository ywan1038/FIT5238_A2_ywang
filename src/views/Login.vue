<template>
  <div class="container py-5" style="max-width:560px">
    <h2 class="mb-4">Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100" type="submit">Login</button>
    </form>

    <button class="btn btn-outline-dark w-100 mt-3" @click="loginWithGoogle">
      <i class="bi bi-google me-1"></i> Sign in with Google
    </button>

    <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/services/firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message
  }
}

async function loginWithGoogle() {
  error.value = ''
  try {
    await signInWithPopup(auth, googleProvider)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message
  }
}
</script>
