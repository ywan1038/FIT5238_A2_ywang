<template>
  <div class="container py-4">
    <h2>Welcome, {{ userStore.username }}!</h2>
    <p>Your role: <strong>{{ userStore.role }}</strong></p>

    <div v-if="userStore.role === 'admin'" class="alert alert-warning mt-3">
      You are an admin and can manage system data.
    </div>
    <div v-else class="alert alert-info mt-3">
      Thank you for using our wellbeing service.
    </div>

    <button class="btn btn-danger mt-4" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>
