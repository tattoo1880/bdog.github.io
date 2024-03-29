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
    },
    {
      name: 'pornstar',
      path: '/pornstar',
      component: () => import('../views/PornStar.vue')
    },
    {
      name: 'channel',
      path: '/channel',
      component: () => import('../views/Channel.vue')
    },
    {
      name: 'play',
      path: '/play',
      component: () => import('../views/Play.vue'),
      //传递参数
      props: (route) => ({
        name: route.query.name,
        url: route.query.url,
      })
  },
  {
    name: 'dltw',
    path: '/dltw',
    component: () => import('../views/DownLoadTw.vue')
  },
  {
    name: 'texteditor',
    path: '/texteditor',
    component: () => import('../views/TextEditor.vue')
  },
  {
    name: 'chat',
    path: '/chat',
    component: () => import('../views/Chat.vue')
  },
  {
    name: 'product',
    path: '/product',
    component: () => import('../views/Product.vue')
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
