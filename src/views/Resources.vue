<template>
  <div class="container py-5">
    <h2 class="mb-4">Mental Health Resources</h2>

    <!-- 语言切换 -->
    <div class="mb-3">
      <label>Language</label>
      <select v-model="language" class="form-select w-auto">
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>

    <!-- 动态资源展示 -->
    <div class="row row-cols-1 row-cols-md-2 g-3 mt-3">
      <ResourceCard
        v-for="(res, i) in filteredResources"
        :key="i"
        :title="res.title"
        :description="res.description"
        :url="res.url"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ResourceCard from '@/components/ResourceCard.vue' // 必须确保存在该组件

const language = ref('en')

// 模拟数据（可替换为 JSON 数据）
const resources = [
  {
    title: 'How to Handle Academic Stress',
    description: 'Tips for international students facing academic pressure.',
    url: 'https://example.com/stress',
    lang: 'en'
  },
  {
    title: '如何应对学业压力',
    description: '面向中国留学生的心理调适建议。',
    url: 'https://example.com/stress-cn',
    lang: 'zh'
  },
  {
    title: 'Finding Balance in Student Life',
    description: 'A short video on self-care.',
    url: 'https://example.com/selfcare',
    lang: 'en'
  },
  {
    title: '学生生活与心理健康视频',
    description: '适合留学生的视频资源。',
    url: 'https://example.com/selfcare-cn',
    lang: 'zh'
  }
]

// 根据语言过滤资源
const filteredResources = computed(() =>
  resources.filter(res => res.lang === language.value)
)
</script>
