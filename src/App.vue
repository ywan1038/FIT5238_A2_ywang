<template>
  <Navbar />
  <main class="container py-4">
    <router-view />
  </main>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
