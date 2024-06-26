<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import type { Product } from '@/store/products'
import { toCurrency } from '@/shared/utils'
import { computed, ref } from 'vue';
import Popup from '@/components/Popup.vue'

defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const showPopup = ref(false)

const addProduct = (product: Product) => {
  cartStore.add(product.id)
  showPopup.value = true
}
</script>

<template>
  <div class="card bordered ">
    <figure class="px-8 pt-10">
      <img
        :src="product.image"
        alt="Card Image"
        class="object-contain w-full h-64"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.id}`">
          {{ product.title }}
        </router-link>
      </h2>
      <p>Giá: {{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <Popup v-if="showPopup" message="Đã thêm vào giỏ hàng" @close="showPopup = false"/>
        <button class="btn glass bg-pastel-red hover:bg-pastel-pink btn-primary" @click="addProduct(product)">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
</template>
