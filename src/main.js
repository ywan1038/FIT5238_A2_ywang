import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useUserStore } from '@/store/user'   // +++

const app = createApp(App).use(router).use(store)
const userStore = useUserStore()
userStore.bindAuthListener()                  // +++ 监听 Firebase 登录态

app.mount('#app')
