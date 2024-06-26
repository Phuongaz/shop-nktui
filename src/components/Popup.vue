<script setup lang="ts">
import { ref } from 'vue'

const showPopup = ref(true)
const emits = defineEmits(['close'])
const props = defineProps<{
  message: string
}>()

const closePopup = () => {
  showPopup.value = false
  emits('close')
}

</script>

<template>
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div class="bg-white rounded-lg p-8">
        <p class="text-lg font-semibold mb-4 text-center">
            {{ message }}
        </p>
        <button @click="closePopup" class="btn glass btn-primary bg-pastel-red hover:bg-pastel-pink block mx-auto">Đóng</button>
      </div>
    </div>
</template>