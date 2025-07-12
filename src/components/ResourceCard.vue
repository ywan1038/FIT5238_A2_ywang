<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ resource.title }}</h5>
      <p class="card-text">{{ resource.description }}</p>
      <a v-if="resource.link" :href="resource.link" target="_blank" class="btn btn-primary btn-sm">Read More</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resource: Object
})
</script>

<style scoped>
.card {
  min-height: 180px;
}
</style>
