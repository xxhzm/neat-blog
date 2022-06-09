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
        path: '/article/:id',
        name: 'Article',
        title: '文章',
        component: () => import('@/views/Article/Article'),
        props: true
      },
      {
        path: '/tag/:id',
        name: 'Tag',
        title: '标签',
        component: () => import('@/views/Tag/Tag'),
        props: true
      },
      {
        path: '/page/:alias',
        name: 'Page',
        title: '独立页面',
        component: () => import('@/views/Page/Page'),
        props: true
      },
      {
        path: '/links',
        name: 'Links',
        title: '友情链接',
        component: () => import('@/views/Page/Links'),
        props: true
      },
      {
        path: '/msgwall',
        name: 'MsgWall',
        title: '留言墙',
        component: () => import('@/views/Page/MsgWall'),
        props: true
      },
      {
        path: '/search/:value',
        name: 'Search',
        title: '搜索',
        component: () => import('@/views/Search/Search'),
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
