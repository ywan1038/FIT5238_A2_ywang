// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入视图组件
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Booking from '../views/Booking.vue'
import Resources from '../views/Resources.vue'
import Email from '../views/Email.vue'
import TablesDemo from '../views/TablesDemo.vue'

// 路由配置
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/email', name: 'Email', component: Email },          // D.2 邮件
  { path: '/tables', name: 'Tables', component: TablesDemo },   // D.3 交互式表格
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
