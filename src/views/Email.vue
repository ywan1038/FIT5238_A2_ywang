<template>
  <div class="container py-5" style="max-width:640px">
    <h2 class="mb-4">Send Email (with Attachment)</h2>

    <form ref="formRef" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">To Name</label>
        <input name="to_name" class="form-control" placeholder="Recipient name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">From Email</label>
        <input name="from_email" type="email" class="form-control" placeholder="your@email.com" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea name="message" class="form-control" rows="4" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Attachment</label>
        <input name="my_file" type="file" class="form-control" />
      </div>

      <button class="btn btn-primary w-100" :disabled="loading">
        <span v-if="!loading">Send</span>
        <span v-else class="spinner-border spinner-border-sm"></span>
      </button>
    </form>

    <div v-if="ok" class="alert alert-success mt-3">Sent!</div>
    <div v-if="err" class="alert alert-danger mt-3">{{ err }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendEmailWithAttachment } from '@/services/email'

const formRef = ref(null)
const loading = ref(false)
const ok = ref(false)
const err = ref('')

async function onSubmit() {
  loading.value = true
  ok.value = false
  err.value = ''
  try {
    await sendEmailWithAttachment(formRef.value)
    ok.value = true
    formRef.value.reset()
  } catch (e) {
    err.value = e.text || e.message
  } finally {
    loading.value = false
  }
}
</script>
