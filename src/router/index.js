import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Dashboard from '@/views/dashboard'
import Article from '@/views/article'

import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'article',
          component: Article,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { token } = store.state.user
  if (to.path !== '/login' && !token) return next('/login')
  next()
})

export default router
