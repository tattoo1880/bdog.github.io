import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '../stores/logstore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      name: 'Lib',
      path: '/lib',
      component: () => import('../views/Lib.vue')
    },
    {
      name: 'movie',
      path: '/movie',
      component: () => import('../views/Movie.vue')
    },
    {
      name: 'av',
      path: '/av',
      component: () => import('../views/Av.vue')
    },
    {
      name: 'pdf',
      path: '/pdf',
      component: () => import('../views/Pdf.vue')
    },
    {
      name: 'news',
      path: '/news',
      component: () => import('../views/News.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = useLoginStore().isLogin
  if (to.path === '/') {
    if (isLogin) {
      next('/home')
    } else {
      next()
    }
  } else {
    if (isLogin) {
      next()
    } else {
      next('/')
    }
  }
})



export default router
