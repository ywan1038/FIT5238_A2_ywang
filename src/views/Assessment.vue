<template>
  <div class="assessment container">
    <h2 class="mb-4">Emotional Wellbeing Self-Assessment</h2>

    <div class="mb-3">
      <label>How do you feel today?</label>
      <RatingStars v-model="rating" />
    </div>

    <button class="btn btn-success" @click="submitRating">Submit Rating</button>
    <div v-if="success" class="alert alert-success mt-3">Thank you for your feedback!</div>

    <hr class="my-5" />

    <h4>Average Score from All Users:</h4>
    <h2 v-if="average !== null">{{ average.toFixed(1) }} ★</h2>
    <p v-else class="text-muted">No ratings yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RatingStars from '@/components/RatingStars.vue'

const rating = ref(0)
const ratings = ref([])
const success = ref(false)
const average = ref(null)

function calculateAverage(arr) {
  if (arr.length === 0) return null
  const sum = arr.reduce((acc, val) => acc + val, 0)
  return sum / arr.length
}

// 提交评分
function submitRating() {
  if (rating.value === 0) {
    alert('Please select a rating before submitting.')
    return
  }

  ratings.value.push(rating.value)
  localStorage.setItem('ratings', JSON.stringify(ratings.value))

  average.value = calculateAverage(ratings.value)
  success.value = true
  rating.value = 0

  setTimeout(() => (success.value = false), 3000)
}

// 初始化加载历史评分
onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('ratings') || '[]')
  ratings.value = stored
  average.value = calculateAverage(ratings.value)
})
</script>

<style scoped>
.assessment {
  max-width: 600px;
  margin: auto;
}
</style>
