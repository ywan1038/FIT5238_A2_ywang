<template>
  <div class="container py-5">
    <h2 class="mb-4">Interactive Tables</h2>

    <h5 class="mt-4">Bookings (Mock)</h5>
    <InteractiveTable :columns="bookingCols" :rows="bookingRows" :pageSize="10" />

    <h5 class="mt-5">Resources (Mock)</h5>
    <InteractiveTable :columns="resCols" :rows="resRows" :pageSize="10" />
  </div>
</template>

<script setup>
import InteractiveTable from '@/components/InteractiveTable.vue'

// 示例列定义
const bookingCols = [
  { key: 'name',  label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'topic', label: 'Topic' },
]
const resCols = [
  { key: 'title', label: 'Title' },
  { key: 'lang',  label: 'Language' },
  { key: 'url',   label: 'URL' },
]

// 你可以用 Mockaroo 导出的 JSON 替换下方模拟数据
const bookingRows = Array.from({ length: 37 }).map((_, i) => ({
  name: `User ${i+1}`, email: `user${i+1}@mail.com`, topic: ['Stress','Career','Lonely'][i%3]
}))
const resRows = Array.from({ length: 28 }).map((_, i) => ({
  title: `Resource ${i+1}`, lang: i%2 ? 'en' : 'zh', url: 'https://example.com'
}))
</script>
