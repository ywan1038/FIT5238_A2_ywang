// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 现有视图
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Booking from '../views/Booking.vue'
import Resources from '../views/Resources.vue'
import Email from '../views/Email.vue'
import TablesDemo from '../views/TablesDemo.vue'

// E/F 新增视图
import BookingCalendar from '../views/BookingCalendar.vue'   // 预约系统（冲突管理）
import AdminDashboard from '../views/AdminDashboard.vue'     // 管理员仪表盘

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/email', name: 'Email', component: Email },
  { path: '/tables', name: 'Tables', component: TablesDemo },

  // 新增（本次需求）
  { path: '/calendar', name: 'Calendar', component: BookingCalendar },
  { path: '/admin', name: 'Admin', component: AdminDashboard },

  // （可选）地图路由
  // { path: '/map', name: 'Map', component: Map },

  // 404 可保持你原有的 NotFound 配置
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
