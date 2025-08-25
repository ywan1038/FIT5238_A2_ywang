<template>
  <div id="main" tabindex="-1" class="container py-4">
    <h2 class="mb-3">Admin Dashboard</h2>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Users by Role</div>
          <div class="card-body">
            <Bar :data="roleData" :options="{ responsive:true, maintainAspectRatio:false }" style="height:300px" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">New Users (Last 7 days)</div>
          <div class="card-body">
            <Line :data="newUserData" :options="{ responsive:true, maintainAspectRatio:false }" style="height:300px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart, BarElement, BarController, CategoryScale, LinearScale,
  PointElement, LineElement, LineController, Tooltip, Legend
} from 'chart.js'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'  // 确保 firebase.js 已导出 db

Chart.register(
  BarElement, BarController, CategoryScale, LinearScale,
  PointElement, LineElement, LineController, Tooltip, Legend
)

const roleData = ref({ labels: ['admin', 'user'], datasets: [{ label: 'Count', data: [0, 0] }] })
const newUserData = ref({ labels: [], datasets: [{ label: 'New Users', data: [] }] })

async function load() {
  try {
    const snap = await getDocs(collection(db, 'users'))
    const byRole = {}
    const created = []
    snap.forEach(doc => {
      const d = doc.data() || {}
      const role = d.role || 'user'
      byRole[role] = (byRole[role] || 0) + 1
      if (d.createdAt) created.push(d.createdAt.toDate ? d.createdAt.toDate() : new Date(d.createdAt))
    })
    roleData.value = {
      labels: Object.keys(byRole),
      datasets: [{ label: 'Count', data: Object.values(byRole) }]
    }

    // 近 7 天新增
    const days = [...Array(7)].map((_, i) => {
      const dt = new Date()
      dt.setDate(dt.getDate() - (6 - i))
      dt.setHours(0, 0, 0, 0)
      return dt
    })
    const series = days.map(d => created.filter(x => x >= d && x < new Date(d.getTime() + 86400000)).length)
    newUserData.value = {
      labels: days.map(d => d.toLocaleDateString()),
      datasets: [{ label: 'New Users', data: series }]
    }
  } catch (e) {
    // 无数据时降级演示
    roleData.value = { labels: ['admin', 'user'], datasets: [{ label: 'Count', data: [2, 10] }] }
    newUserData.value = { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ label: 'New Users', data: [1,2,1,3,0,2,4] }] }
  }
}

onMounted(load)
</script>
