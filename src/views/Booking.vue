<template>
  <div class="booking-page container">
    <h2 class="mb-4">Anonymous Counselling Booking</h2>

    <form @submit.prevent="submitBooking" novalidate>
      <div class="mb-3">
        <label>Name (Alias)</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input v-model="form.email" type="email" class="form-control" required />
        <div v-if="!isValidEmail && form.email" class="text-danger">Invalid email format</div>
      </div>

      <div class="mb-3">
        <label>Topic</label>
        <select v-model="form.topic" class="form-select">
          <option value="">Select a topic</option>
          <option>Academic Stress</option>
          <option>Loneliness</option>
          <option>Career Anxiety</option>
          <option>Homesickness</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Description</label>
        <textarea v-model="form.description" class="form-control" rows="4"></textarea>
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <div v-if="success" class="alert alert-success mt-3">Booking submitted successfully!</div>

    <hr class="my-5" />

    <h4>Previous Bookings</h4>
    <div v-if="bookings.length === 0" class="text-muted">No bookings yet.</div>

    <div v-else class="row row-cols-1 row-cols-md-2 g-3 mt-3">
      <div class="col" v-for="(b, i) in bookings" :key="i">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ b.topic }}</h5>
            <p class="card-text"><strong>Name:</strong> {{ b.name }}</p>
            <p class="card-text"><strong>Email:</strong> {{ b.email }}</p>
            <p class="card-text">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const form = ref({
  name: '',
  email: '',
  topic: '',
  description: ''
})

const bookings = ref([])
const success = ref(false)

// B.1: Email 格式验证
const isValidEmail = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
)

// 加载历史预约记录
onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('bookings') || '[]')
  bookings.value = stored
})

// 提交预约
function submitBooking() {
  if (!form.value.name || !isValidEmail.value) {
    alert('Please fill in required fields correctly.')
    return
  }

  const newBooking = { ...form.value }
  bookings.value.push(newBooking)
  localStorage.setItem('bookings', JSON.stringify(bookings.value))

  success.value = true

  // 重置表单
  form.value = {
    name: '',
    email: '',
    topic: '',
    description: ''
  }

  // 自动关闭提示
  setTimeout(() => {
    success.value = false
  }, 3000)
}
</script>

<style scoped>
.booking-page {
  max-width: 800px;
  margin: auto;
}
</style>
