import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Base',
    title: '根组件',
    component: () => import('@/views/Layout/Base')
  }, {
    path: '/login',
    name: 'LoginOrRegister',
    title: '登陆 | 注册',
    component: () => import('@/views/Login/LoginOrRegister')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
