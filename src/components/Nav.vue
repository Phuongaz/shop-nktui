<script setup lang="ts">
import { computed, ref } from 'vue'
import Search from './Search.vue'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router';
import { useProductStore } from '@/store/products';

const cartStore = useCartStore()

const count = computed(() => cartStore.count)
const productStore = useProductStore()
const router = useRouter()
const input = ref('')
const showSearch = ref(false)
const searchResults = computed(() => {
  if (!input.value || input.value.length < 2)
    return []

  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase())
  })
})

function navigate(id: number) {
  input.value = ''
  router.push(`/product/${id}`)
  showSearch.value = false
}
</script>

<template>
    <div class="navbar fixed top-0 left-0 right-0 z-50 bg-pastel-red shadow-lg border-none">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-5 p-2 shadow-lg bg-pastel-red rounded-box w-52">
            <li><router-link to="/" class="btn btn-ghost">Trang chủ</router-link></li>
            <li><router-link to="/cart" class="btn btn-ghost">
              Giỏ hàng <div class="badge ml-2 badge-outline" v-text="count"/>
              </router-link>
            </li>
            <li><router-link to="#" class="btn btn-ghost">Fanpage</router-link></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <router-link to="/" class="btn font-playwrite flass btn-ghost normal-case text-xl">NK Túi</router-link>
      </div>
      <div class="navbar-end">
        <div class="indicator">
          <router-link to="/cart" class="btn btn-ghost btn-circle">
            <span class="indicator-item pt-5 pr-4">{{count}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          </router-link>
        </div>
        <label for="my-modal-3" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </label>
      </div>
    </div>
    <input type="checkbox" id="my-modal-3" class="modal-toggle" v-model="showSearch">
    <div class="modal">
      <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle border-none bg-base-100 text-black font-bold absolute right-2 top-2">✕</label>
        <div class="form-control pr-6">
          <input type="text" placeholder="Tìm kiếm..." class="input input-bordered bg-base-100" v-model="input">
        </div>
        <ul class="shadow menu dropdown-content bg-base-100 rounded-box w-full text-base-content overflow-y-scroll" style="max-height: 50vh;">
          <li v-for="product in searchResults" :key="product.id">
            <a href="#" @click.prevent="navigate(product.id)" v-text="product.title" />
          </li>
        </ul>
      </div>
    </div>
</template>