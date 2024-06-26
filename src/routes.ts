import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Payment from './pages/Payment.vue'
import Cart from './pages/Cart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:productId', component: Product },
  { path: '/cart', component: Cart },
  { path: '/payment', component: Payment },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
