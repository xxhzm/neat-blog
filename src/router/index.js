import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Base',
    title: '根组件',
    component: () => import('@/views/Layout/Base')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
