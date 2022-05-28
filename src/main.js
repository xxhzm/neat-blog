import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入网络请求
import '@/utils/request'

// 导入 bootstrap5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(store).use(router).mount('#app')
