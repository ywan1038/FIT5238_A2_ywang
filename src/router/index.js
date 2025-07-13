import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Booking from '../views/Booking.vue'
import Resources from '../views/Resources.vue'
import Assessment from '../views/Assessment.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/assessment', name: 'Assessment', component: Assessment },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
