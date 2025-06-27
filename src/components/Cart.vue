<template>
  <!-- Cart Overlay -->
  <Transition
    enter-active-class="transition-opacity ease-linear duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      @click="cartStore.closeCart()"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <!-- Cart Panel -->
      <Transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="cartStore.isOpen"
          class="absolute right-0 top-0 h-full w-full max-w-md sm:max-w-lg bg-white shadow-2xl"
          @click.stop
        >
          <!-- Cart Header -->
          <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H18M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zM20 19.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-white">Mon Panier VVS</h2>
                <p class="text-sm text-purple-100">{{ cartStore.itemCount }} {{ cartStore.itemCount > 1 ? 'articles' : 'article' }}</p>
              </div>
            </div>
            <button
              @click="cartStore.closeCart()"
              class="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Empty Cart State -->
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-full px-6 py-12">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H18M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zM20 19.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
            <p class="text-gray-500 text-center mb-6">Découvrez nos produits premium et ajoutez-les à votre panier pour commencer vos achats</p>
            <button
              @click="cartStore.closeCart()"
              class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Découvrir nos produits
            </button>
          </div>

          <!-- Cart Items -->
          <div v-else class="flex flex-col h-full">
            <!-- Items List -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <Transition-group
                name="cart-item"
                tag="div"
                class="space-y-4"
              >
                <div
                  v-for="item in cartStore.items"
                  :key="item.id"
                  class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div class="flex space-x-4">
                    <!-- Product Image -->
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl overflow-hidden ring-2 ring-purple-100">
                        <img
                          :src="item.product.images[0]"
                          :alt="item.product.name"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <!-- Product Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between items-start mb-2">
                        <h3 class="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
                          {{ item.product.name }}
                        </h3>
                        <button
                          @click="cartStore.removeFromCart(item.id)"
                          class="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <!-- Variant Info -->
                      <div v-if="item.selectedVariant" class="text-xs text-gray-500 mb-2 flex flex-wrap gap-1">
                        <span v-for="(value, attr) in item.selectedVariant.attributes" :key="attr" class="bg-gray-100 px-2 py-1 rounded">
                          {{ attr }}: {{ value }}
                        </span>
                      </div>

                      <!-- Price and Quantity -->
                      <div class="flex items-center justify-between">
                        <div class="text-sm sm:text-base font-bold text-purple-600">
                          {{ localeStore.formatPrice(item.product.promotionalPrice || item.selectedVariant?.price || item.product.price) }}
                          <span v-if="item.product.promotionalPrice" class="text-xs text-gray-400 line-through ml-2">
                            {{ localeStore.formatPrice(item.product.price) }}
                          </span>
                        </div>

                        <!-- Quantity Controls -->
                        <div class="flex items-center space-x-2 bg-gray-50 rounded-xl p-1">
                          <button
                            @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                            class="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                          >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span class="w-8 text-center font-semibold text-gray-900 text-sm">{{ item.quantity }}</span>
                          <button
                            @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                            class="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                          >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition-group>
            </div>

            <!-- Cart Footer -->
            <div class="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50 p-4 sm:p-6">
              <!-- Subtotal -->
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold text-gray-900">Sous-total</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {{ localeStore.formatPrice(cartStore.totalPrice) }}
                </span>
              </div>

              <!-- Shipping Info -->
              <div class="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm font-medium text-green-800">Livraison gratuite pour les commandes de plus de 50 000 FC</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3">
                <router-link
                  to="/checkout"
                  @click="cartStore.closeCart()"
                  class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-center block hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Finaliser la commande ({{ localeStore.formatPrice(cartStore.totalPrice) }})
                </router-link>
                <button
                  @click="cartStore.closeCart()"
                  class="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-all"
                >
                  Continuer mes achats
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'

const cartStore = useCartStore()
const localeStore = useLocaleStore()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Cart item animations */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-move {
  transition: transform 0.3s ease;
}
</style>
