<template>
  <div class="home container text-center py-5">
    <h1 class="mb-3">Welcome to MindBridge</h1>
    <p class="lead">
      A bilingual wellbeing platform for Chinese international students in Australia.
    </p>
    <p>
      Whether you're facing academic pressure, homesickness, or just want someone to talk to —
      we're here to help.
    </p>

    <div class="mt-4">
      <router-link class="btn btn-primary btn-lg me-3" to="/booking">Book a Session</router-link>
      <router-link class="btn btn-outline-secondary btn-lg me-3" to="/assessment">Take Assessment</router-link>
      <router-link class="btn btn-outline-success btn-lg me-3" to="/resources">Explore Resources</router-link>
      <router-link class="btn btn-warning btn-lg" to="/register">Register</router-link>
    </div>

    <div class="mt-5">
      <img
        src="https://cdn.pixabay.com/photo/2017/02/23/13/05/mental-health-2094463_960_720.jpg"
        alt="Wellbeing Illustration"
        class="img-fluid rounded shadow"
        style="max-height: 400px;"
      />
    </div>
  </div>
</template>

<script setup>
// 无需脚本逻辑
</script>

<style scoped>
.home h1 {
  font-size: 2.8rem;
  font-weight: bold;
  color: #222;
}
.lead {
  font-size: 1.25rem;
}
</style>
