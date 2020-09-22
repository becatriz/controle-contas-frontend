import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'app.accounts',
    component: () => import('../views/Accounts.vue')
  },
  {
    path: '/reports',
    name: 'app.reports',
    component: () => import('../views/Reports.vue')
  },
  {
    path: '/users',
    name: 'app.users',
    component: () => import('../views/Users.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
