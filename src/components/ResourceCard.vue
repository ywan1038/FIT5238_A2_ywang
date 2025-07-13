<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <a :href="url" class="btn btn-outline-primary" target="_blank">View</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'description', 'url'])
</script>
