import { createApp } from 'vue'
// 导入网络请求
import '@/utils/request'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 bootstrap5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 导入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
