import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderPageView from '../views/OrderPageView.vue'
import Error404View from '../views/Error404View.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPageView
  },
  {
    path: '*',
    name: 'error404',
    component: Error404View,
    meta: {status: 404}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
