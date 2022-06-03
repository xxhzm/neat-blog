import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Base',
    title: '根组件',
    component: () => import('@/views/Layout/Base'),
    children: [
      {
        path: '/',
        name: 'Index',
        title: '首页',
        component: () => import('@/views/Index/Index')
      },
      {
        path: '/tag/:id',
        name: 'Tag',
        title: '标签',
        component: () => import('@/views/Tag/Tag'),
        props: true
      }
    ]
  }, {
    path: '/login',
    name: 'LoginOrRegister',
    title: '登陆 | 注册',
    component: () => import('@/views/LoginAndRegister/LoginAndRegister')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
