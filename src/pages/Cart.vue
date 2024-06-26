<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CartCard from '../components/CartCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import { toCurrency } from '../shared/utils'
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/products'

const cartStore = useCartStore()
const productStore = useProductStore()
const showPaymentForm = ref(false)
const showEmptyMessage = ref(false)
const paymentFormRef = ref<HTMLElement | null>(null)
const formattedCart = computed(() => cartStore.formattedCart)

const toggleShowEmptyMessage = () => {
  showEmptyMessage.value = !showEmptyMessage.value
}

const toggleShowPaymentForm = () => {
  if (cartStore.total > 0) {
    showPaymentForm.value = !showPaymentForm.value;
  } else {
    showEmptyMessage.value = true;
  }
};
</script>

<template>
  <div class="mt-20 p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <div class="border border-gray-300 rounded-lg p-4 text-center">
        <h2 class="text-lg font-semibold mb-4">Giỏ hàng trống</h2>
        <img src="../assets/empty-cart.gif" alt="Empty cart" class="w-1/2 mx-auto" />
      </div>
    </div>
    <div v-else class="space-y-4">
      <CartCard
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cart-product="cartProduct"
      />
    </div>
    <div v-if="showEmptyMessage" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div class="bg-white rounded-lg p-8">
        <p class="text-lg font-semibold mb-4 text-center">
            Giỏ hàng trống <br>
            Hãy thêm sản phẩm vào giỏ hàng
        </p>
        <button @click="toggleShowEmptyMessage" class="btn glass btn-primary bg-pastel-red hover:bg-pastel-pink block mx-auto">Đóng</button>
      </div>
    </div>
    <div class="pt-3 flex justify-between items-center">
      <div class="font-playwrite text-left text-2xl md:text-2xl">
        Tổng cộng: {{ toCurrency(cartStore.total) }}
      </div>
      <router-link to="/payment">
        <button class="btn btn-primary glass bg-pastel-red hover:bg-pastel-pink" @click="toggleShowPaymentForm">
          Thanh toán
        </button>
      </router-link>
    </div>
  </div>
</template>
