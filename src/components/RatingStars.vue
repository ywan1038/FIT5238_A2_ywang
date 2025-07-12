<template>
  <div class="rating-stars">
    <i
      v-for="star in 5"
      :key="star"
      class="bi"
      :class="star <= modelValue ? 'bi-star-fill text-warning' : 'bi-star'"
      @click="$emit('update:modelValue', star)"
      role="button"
    ></i>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.rating-stars i {
  font-size: 1.8rem;
  margin-right: 0.2rem;
  cursor: pointer;
}
</style>
