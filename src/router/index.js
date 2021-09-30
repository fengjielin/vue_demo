import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: '',
    redirect: '/teachingPlan/termTeachingPlan'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/asyn',
    name: 'Asyn',
    component: () => import('../views/Asyn.vue')
  },
  {
    path: '/teachingPlan/termTeachingPlan',
    name: 'TermTeachingPlan',
    component: () => import('../views/teachingPlan/termTeachingPlan.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router