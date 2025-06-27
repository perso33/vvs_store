<template>
  <!-- Mini Cart Notification -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div
      v-if="showNotification && lastAddedItem"
      class="fixed top-20 sm:top-24 right-3 sm:right-6 z-40 max-w-sm"
    >
      <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div class="p-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="font-semibold text-gray-900 text-sm">Ajouté au panier !</span>
            </div>
            <button
              @click="hideNotification"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Product Info -->
          <div class="flex space-x-3 mb-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  :src="lastAddedItem.product.images[0]"
                  :alt="lastAddedItem.product.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 line-clamp-2">
                {{ lastAddedItem.product.name }}
              </h4>
              <p class="text-xs text-gray-500 mt-1">
                Quantité: {{ lastAddedItem.quantity }}
              </p>
              <p class="text-sm font-semibold text-purple-600 mt-1">
                {{ localeStore.formatPrice(lastAddedItem.product.promotionalPrice || lastAddedItem.product.price) }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex space-x-2">
            <button
              @click="cartStore.openCart(); hideNotification()"
              class="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Voir le panier ({{ cartStore.itemCount }})
            </button>
            <button
              @click="hideNotification"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import type { CartItem } from '@/types'

const cartStore = useCartStore()
const localeStore = useLocaleStore()

const showNotification = ref(false)
const lastAddedItem = ref<CartItem | null>(null)
let timeoutId: number | null = null

// Watch for new items added to cart
watch(() => cartStore.items.length, (newLength, oldLength) => {
  if (newLength > oldLength && cartStore.items.length > 0) {
    // Get the last added item
    lastAddedItem.value = cartStore.items[cartStore.items.length - 1]
    showNotification.value = true
    
    // Auto hide after 4 seconds
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      showNotification.value = false
    }, 4000)
  }
}, { immediate: false })

const hideNotification = () => {
  showNotification.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
