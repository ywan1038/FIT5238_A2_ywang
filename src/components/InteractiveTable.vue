<template>
  <div>
    <!-- 全局搜索 -->
    <div class="mb-3 d-flex gap-2 align-items-center">
      <input v-model="globalQuery" class="form-control" placeholder="Search all..." />
      <span class="text-muted small">Rows: {{ filteredRows.length }}</span>
    </div>

    <!-- 按列搜索 -->
    <div class="row g-2 mb-2">
      <div class="col" v-for="col in columns" :key="col.key">
        <input v-model="columnFilters[col.key]" class="form-control" :placeholder="`Search ${col.label}`" />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" @click="toggleSort(col.key)" style="cursor:pointer; white-space:nowrap">
              {{ col.label }}
              <i v-if="sort.key===col.key && sort.dir==='asc'" class="bi bi-caret-up-fill ms-1"></i>
              <i v-else-if="sort.key===col.key && sort.dir==='desc'" class="bi bi-caret-down-fill ms-1"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pagedRows" :key="row.__id">
            <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
          </tr>
          <tr v-if="pagedRows.length===0"><td :colspan="columns.length" class="text-center text-muted">No data</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="text-muted small">Page {{ page }} / {{ totalPages }}</div>
      <div class="btn-group">
        <button class="btn btn-outline-secondary" :disabled="page===1" @click="page--">Prev</button>
        <button class="btn btn-outline-secondary" :disabled="page===totalPages" @click="page++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from 'vue'

const props = defineProps({
  columns: { type: Array, required: true }, // [{ key:'name', label:'Name' }, ...]
  rows: { type: Array, required: true },    // [{ name:'', ... }]
  pageSize: { type: Number, default: 10 }
})

const sort = reactive({ key: null, dir: 'asc' })
const page = ref(1)
const globalQuery = ref('')
const columnFilters = reactive({})

watchEffect(() => {
  // 初始化列过滤字段
  props.columns.forEach(c => { if (!(c.key in columnFilters)) columnFilters[c.key] = '' })
})

function toggleSort(key) {
  if (sort.key !== key) { sort.key = key; sort.dir = 'asc' }
  else { sort.dir = (sort.dir === 'asc' ? 'desc' : 'asc') }
  page.value = 1
}

const filteredRows = computed(() => {
  const q = globalQuery.value.trim().toLowerCase()
  return props.rows.filter((r) => {
    // 全局过滤
    const globalOk = q === '' || Object.values(r).some(v => String(v ?? '').toLowerCase().includes(q))
    if (!globalOk) return false
    // 按列过滤
    for (const k of Object.keys(columnFilters)) {
      const cq = (columnFilters[k] || '').trim().toLowerCase()
      if (cq && !String(r[k] ?? '').toLowerCase().includes(cq)) return false
    }
    return true
  })
})

const sortedRows = computed(() => {
  const arr = [...filteredRows.value]
  if (!sort.key) return arr
  return arr.sort((a, b) => {
    const va = a[sort.key]; const vb = b[sort.key]
    if (va == null && vb == null) return 0
    if (va == null) return sort.dir === 'asc' ? -1 : 1
    if (vb == null) return sort.dir === 'asc' ? 1 : -1
    if (va < vb) return sort.dir === 'asc' ? -1 : 1
    if (va > vb) return sort.dir === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize)))
const pagedRows = computed(() => {
  const start = (page.value - 1) * props.pageSize
  return sortedRows.value.slice(start, start + props.pageSize)
})

// Watch totalPages and adjust page if needed
watchEffect(() => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value
  }
})

// 给每行一个稳定 key
// 已移除未使用的 _rows
</script>
