<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import Carousel from '../components/Carousel.vue'
import { useProductStore } from '@/store/products'

const productStore = useProductStore()

const products = computed(() => productStore.list)

const latestProducts = computed(() => {
  return productStore.list.slice(0, 8)
})

</script>

<template>
  <div class="logo-section flex flex-col items-center justify-center py-4 space-x-4">
    <img src="../assets/logo-main.png" alt="Logo" class="w-200 my-9 rounded-full">
    <p class="font-playwriteDC text-xl font-bold my-5">Túi hàng quảng châu giá rẻ</p>
    <div class="w-1/2 border-t border-gray-300 my-5"></div>
  </div>
  <div v-if="productStore.loaded">
    <p class="text-center text-lg font-semibold my-5">Sản phẩm mới nhất</p>
    <Carousel
      :products="latestProducts"
      carouselId="latest-products"
      classNameCarousel="h-64 "
      classNameForImage="bg-center bg-cover bg-no-repeat"
    />
  </div>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProductCardSkeleton
        v-for="n in 15"
        v-show="!productStore.loaded"
        :key="n"
      />
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>