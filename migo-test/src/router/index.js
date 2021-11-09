import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventory from '../views/Inventory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Inventory,
    redirect: { name: 'Inventory' }
  },
  {
    path: '/Inventory',
    name: 'Inventory',
    component: Inventory,
  }

]

const router = new VueRouter({
  routes
})

export default router
