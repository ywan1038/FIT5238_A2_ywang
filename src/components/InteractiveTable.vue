<template>
  <div>
    <!-- 工具栏：导出 + 全局搜索 -->
    <div class="mb-3 d-flex gap-2 align-items-center">
      <button
        class="btn btn-outline-secondary"
        @click="onExport"
        aria-label="Export current table as CSV"
      >
        Export CSV
      </button>
      <input
        v-model="globalQuery"
        class="form-control"
        placeholder="Search all..."
        aria-label="Global search"
      />
      <span class="text-muted small">Rows: {{ filteredRows.length }}</span>
    </div>

    <!-- 按列搜索 -->
    <div class="row g-2 mb-2">
      <div class="col" v-for="col in columns" :key="col.key">
        <label class="form-label visually-hidden" :for="`col-${col.key}`">
          Search {{ col.label || col.key }}
        </label>
        <input
          :id="`col-${col.key}`"
          v-model="columnFilters[col.key]"
          class="form-control"
          :placeholder="`Search ${col.label || col.key}`"
        />
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              @click="toggleSort(col.key)"
              scope="col"
              :aria-sort="sort.key === col.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'"
              tabindex="0"
              @keydown.enter="toggleSort(col.key)"
              @keydown.space.prevent="toggleSort(col.key)"
              style="cursor: pointer"
            >
              <span class="d-inline-flex align-items-center gap-1">
                {{ col.label || col.key }}
                <span v-if="sort.key === col.key">
                  <span v-if="sort.dir === 'asc'">▲</span>
                  <span v-else>▼</span>
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, i) in pagedRows" :key="row.id || i">
            <td v-for="col in columns" :key="col.key">
              <span>{{ row[col.key] }}</span>
            </td>
          </tr>
          <tr v-if="pagedRows.length === 0">
            <td :colspan="columns.length" class="text-center text-muted">No data</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <nav class="d-flex justify-content-between align-items-center" aria-label="Table pagination">
      <div class="small text-muted">
        Page {{ page }} / {{ totalPages }}
      </div>
      <ul class="pagination mb-0">
        <li :class="['page-item', { disabled: page === 1 }]">
          <button class="page-link" @click="go(1)" aria-label="First">«</button>
        </li>
        <li :class="['page-item', { disabled: page === 1 }]">
          <button class="page-link" @click="go(page - 1)" aria-label="Previous">‹</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">{{ page }}</span>
        </li>
        <li :class="['page-item', { disabled: page === totalPages }]">
          <button class="page-link" @click="go(page + 1)" aria-label="Next">›</button>
        </li>
        <li :class="['page-item', { disabled: page === totalPages }]">
          <button class="page-link" @click="go(totalPages)" aria-label="Last">»</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { toCSV, downloadCSV } from '@/utils/export'

// props：columns=[{key,label}], rows=[{...}], pageSize=10
const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  pageSize: { type: Number, default: 10 }
})

const sort = reactive({ key: null, dir: 'asc' })
const page = ref(1)
const globalQuery = ref('')
const columnFilters = reactive({})

watchEffect(() => {
  // 初始化列过滤字段
  props.columns.forEach(c => {
    if (!(c.key in columnFilters)) columnFilters[c.key] = ''
  })
})

function normalize(v) {
  return String(v == null ? '' : v).toLowerCase().trim()
}

const filteredRows = computed(() => {
  const gq = normalize(globalQuery.value)
  return props.rows.filter(r => {
    // 全局搜索
    const okGlobal = !gq || Object.values(r).some(v => normalize(v).includes(gq))
    if (!okGlobal) return false
    // 按列搜索
    for (const col of props.columns) {
      const q = normalize(columnFilters[col.key])
      if (q && !normalize(r[col.key]).includes(q)) return false
    }
    return true
  })
})

const sortedRows = computed(() => {
  const data = [...filteredRows.value]
  if (!sort.key) return data
  data.sort((a, b) => {
    const va = a[sort.key], vb = b[sort.key]
    if (va == null && vb == null) return 0
    if (va == null) return -1
    if (vb == null) return 1
    if (va > vb) return sort.dir === 'asc' ? 1 : -1
    if (va < vb) return sort.dir === 'asc' ? -1 : 1
    return 0
  })
  return data
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize)))
const pagedRows = computed(() => {
  const start = (page.value - 1) * props.pageSize
  return sortedRows.value.slice(start, start + props.pageSize)
})

watchEffect(() => {
  if (page.value > totalPages.value) page.value = totalPages.value
})

function toggleSort(key) {
  if (sort.key !== key) { sort.key = key; sort.dir = 'asc' }
  else { sort.dir = (sort.dir === 'asc' ? 'desc' : 'asc') }
}

function go(p) {
  const n = Math.min(Math.max(1, p), totalPages.value)
  page.value = n
}

/** 导出当前分页数据为 CSV */
function onExport() {
  const csv = toCSV(pagedRows.value, props.columns)
  downloadCSV(csv, 'table_export.csv')
}
</script>
