<template>
  <div class="resources container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Wellbeing Resources</h2>
      <select v-model="language" class="form-select w-auto">
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="(item, index) in displayedResources" :key="index">
        <ResourceCard :resource="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResourceCard from '@/components/ResourceCard.vue'

const language = ref('en')
const resources = ref([])

// 示例资源数据（你也可以改为 JSON 文件加载）
const rawData = {
  en: [
    {
      title: 'Managing Study Stress',
      description: 'Tips for handling academic pressure effectively.',
      link: 'https://example.com/en/study-stress'
    },
    {
      title: 'Overcoming Loneliness',
      description: 'How to build a support network while studying abroad.',
      link: 'https://example.com/en/loneliness'
    }
  ],
  zh: [
    {
      title: '应对学业压力',
      description: '如何有效应对学业负担。',
      link: 'https://example.com/zh/study-stress'
    },
    {
      title: '如何面对孤独',
      description: '在澳洲建立支持网络的建议。',
      link: 'https://example.com/zh/loneliness'
    }
  ]
}

const displayedResources = computed(() => resources.value)

// 加载资源（模拟异步/持久化）
onMounted(() => {
  // 尝试从本地缓存读取
  const cached = localStorage.getItem('wellbeing_resources')
  if (cached) {
    resources.value = JSON.parse(cached)
  } else {
    resources.value = rawData[language.value]
    localStorage.setItem('wellbeing_resources', JSON.stringify(rawData[language.value]))
  }
})

// 当语言变化时切换资源
watch(language, (lang) => {
  resources.value = rawData[lang]
  localStorage.setItem('wellbeing_resources', JSON.stringify(rawData[lang]))
})
</script>

<style scoped>
.resources {
  max-width: 900px;
  margin: auto;
}
</style>
