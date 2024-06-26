<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '@/store/cart'
import { useProductStore } from '@/store/products'
import type { Product } from '@/store/products'
import { toCurrency } from '@/shared/utils'
import Popup from '@/components/Popup.vue'
import CartCardSkeleton from '@/components/CartCardSkeleton.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()

const showPopup = ref(false)

const product = computed<Product>(
  () => productStore.items[route.params.productId as string],
)

const addProduct = (product: Product) => {
  cartStore.add(product.id)
  showPopup.value = true
}

</script>

<template>
  <div class="p-4 mt-20 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="card lg:card-side bordered">
      <figure class="px-10 pt-10">
        <img
          :src="product.image"
          alt="Card Image"
          class="object-contain w-full h-64"
        >
      </figure>
      <div class="card-body">
        <h2 class="card-title" v-text="product.title" />
        <p v-text="product.description" />
        <p class="mt-4 text-lg">
          {{ toCurrency(product.price) }}
        </p>
        <Popup v-if="showPopup" message="Đã thêm vào giỏ hàng" @close="showPopup = false"/>
        <div class="card-actions">
          <button class="btn glass bg-pastel-red hover:bg-pastel-pink btn-primary" @click="addProduct(product)">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        Không tìm thấy sản phẩm: {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>