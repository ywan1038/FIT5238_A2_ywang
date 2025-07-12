<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <router-link class="navbar-brand" to="/">Wellbeing</router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><router-link class="nav-link" to="/resources">Resources</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/booking">Booking</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/assessment">Assessment</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
