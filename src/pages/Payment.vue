<script setup lang="ts">
import { toCurrency } from '@/shared/utils';
import { useCartStore } from '@/store/cart';
import { reactive, ref } from 'vue';

const cartStore = useCartStore()
const emptyCart = ref(false);
const customer = reactive({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        note: '',
        payment: 'cod',
});
const showSuccessMessage = ref(false);
let formSubmitted = false;

const handleSubmit = () => {
    if (!customer.fullname.trim() || !customer.phone.trim() || !customer.address.trim()) {
        formSubmitted = true;
        return;
    }

    if(cartStore.total <= 0) {
        emptyCart.value = true;
        return;
    }

    console.log('Submiter:', customer.fullname);
    showSuccessMessage.value = true;
};


const closeSuccessMessage = () => {
    showSuccessMessage.value = false;
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-lg p-4 mt-20 mb-10">
        <h2 class="text-lg font-semibold mb-2 text-center">Thông tin thanh toán</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="fullname" class="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input type="text" id="fullname" v-model="customer.fullname"
                       :class="[
                           'form-input', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm',
                           'focus:border-pastel-red', 'focus:ring', 'focus:ring-pastel-red', 'focus:ring-opacity-50',
                           { 'border-red-500': formSubmitted && !customer.fullname.trim() }
                       ]">
                <p v-if="formSubmitted && !customer.fullname.trim()" class="text-red-500 text-xs mt-1">Vui lòng nhập họ và tên.</p>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="customer.email"
                       class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-red focus:ring focus:ring-pastel-red focus:ring-opacity-50">
            </div>
            <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input type="text" id="phone" v-model="customer.phone"
                       :class="[
                           'form-input', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm',
                           'focus:border-pastel-red', 'focus:ring', 'focus:ring-pastel-red', 'focus:ring-opacity-50',
                           { 'border-red-500': formSubmitted && !customer.phone.trim() }
                       ]">
                <p v-if="formSubmitted && !customer.phone.trim()" class="text-red-500 text-xs mt-1">Vui lòng nhập số điện thoại.</p>
            </div>
            <div class="mb-4">
                <label for="address" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <input type="text" id="address" v-model="customer.address"
                       :class="[
                           'form-input', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm',
                           'focus:border-pastel-red', 'focus:ring', 'focus:ring-pastel-red', 'focus:ring-opacity-50',
                           { 'border-red-500': formSubmitted && !customer.address.trim() }
                       ]">
                <p v-if="formSubmitted && !customer.address.trim()" class="text-red-500 text-xs mt-1">Vui lòng nhập địa chỉ.</p>
            </div>
            <div class="mb-4">
                <label for="note" class="block text-sm font-medium text-gray-700">Ghi chú</label>
                <textarea placeholder="Ghi chú cho shop...." v-model="customer.note"
                          class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-red focus:ring focus:ring-pastel-red focus:ring-opacity-50"></textarea>
            </div>

            <div class="mb-4">
                <label for="payment" class="block text-sm font-medium text-gray-700">Phương thức thanh toán <p
                            class="font-bold">(Chưa phát triển)</p></label>
                <select v-model="customer.payment" disabled id="payment"
                        class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-red focus:ring focus:ring-pastel-red focus:ring-opacity-50">
                    <option value="cod">Thanh toán khi nhận hàng</option>
                    <option value="momo">Thanh toán qua MoMo</option>
                    <option value="visa">Thanh toán qua thẻ Visa/MasterCard</option>
                </select>
            </div>
            <div class="border border-gray-300 rounded-lg p-4">
                <p class="text-l font-semibold mb-2">Sản phẩm trong giỏ hàng</p>
                <ul class="list-disc list-inside">
                    <li v-for="product in cartStore.formattedCart" :key="product.id">
                        {{ product.title }} x {{ product.quantity }}
                    </li>
                </ul>
                <p class="text-lg font-semibold mt-2">Tổng cộng: {{ toCurrency(cartStore.total) }}</p>
            </div>
            <button type="submit"
                    @click="formSubmitted = true"
                    :disabled="!customer.fullname.trim() || !customer.phone.trim() || !customer.address.trim()"
                    class="btn glass btn-primary bg-pastel-red my-4 hover:bg-pastel-pink">Đặt hàng
            </button>
        </form>
    </div>

    <div v-if="emptyCart">
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg p-8">
                <p class="text-lg font-semibold mb-4 text-center">
                    Giỏ hàng trống <br>
                    Hãy thêm sản phẩm vào giỏ hàng
                </p>
                <router-link to="/">
                    <button @click="emptyCart = false"
                            class="btn glass btn-primary bg-pastel-red hover:bg-pastel-pink block mx-auto">Đóng
                    </button>
                </router-link>
            </div>
        </div>
    </div>

    <div v-if="showSuccessMessage" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-8">
            <p class="text-lg font-semibold mb-4 text-center">
                Đã đặt hàng thành công <br>
                Shop sẽ gọi điện cho bạn để xác nhận đơn hàng
            </p>
            <button @click="closeSuccessMessage"
                    class="btn glass btn-primary bg-pastel-red hover:bg-pastel-pink block mx-auto">Đóng
            </button>
        </div>
    </div>
</template>
