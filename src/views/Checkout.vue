<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b border-purple-100">
      <div class="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 sm:space-x-4">
            <router-link
              to="/"
              class="p-2 text-gray-500 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m0 0v14"></path>
              </svg>
            </router-link>
            <h1 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Finaliser ma commande
            </h1>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-xs sm:text-sm">VVS</span>
            </div>
            <span class="hidden sm:block text-sm text-gray-500">Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <!-- Left Column - Forms -->
        <div class="space-y-4 sm:space-y-8">
          <!-- Step Progress -->
          <div class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-purple-100">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-xs sm:text-sm">1</span>
                </div>
                <span class="font-semibold text-gray-900 text-sm sm:text-base">Informations de livraison</span>
              </div>
              <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-gray-500 font-bold text-xs sm:text-sm">2</span>
                </div>
                <span class="font-semibold text-gray-500 text-sm sm:text-base">Paiement</span>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div class="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full w-1/2 transition-all duration-500"></div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span class="text-2xl">📍</span>
              <span>Adresse de livraison</span>
            </h2>
            
            <form @submit.prevent="proceedToPayment" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    v-model="shippingForm.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Votre prénom"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    v-model="shippingForm.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Votre nom"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
                <input
                  v-model="shippingForm.address"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="123 rue de la Paix"
                >
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Code postal</label>
                  <input
                    v-model="shippingForm.zipCode"
                    type="text"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="75000"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Ville</label>
                  <input
                    v-model="shippingForm.city"
                    type="text"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Lubumbashi"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Pays</label>
                  <select
                    v-model="shippingForm.country"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="CD">🇨🇩 République Démocratique du Congo</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="BE">🇧🇪 Belgique</option>
                    <option value="CH">🇨🇭 Suisse</option>
                    <option value="CA">🇨🇦 Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  v-model="shippingForm.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="+33 1 23 45 67 89"
                >
              </div>

              <!-- Shipping Options -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span class="text-xl">🚚</span>
                  <span>Options de livraison</span>
                </h3>
                <div class="space-y-3">
                  <label class="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                    <input
                      v-model="shippingForm.method"
                      type="radio"
                      value="standard"
                      class="w-4 h-4 text-purple-600"
                    >
                    <div class="flex-1 flex justify-between items-center">
                      <div>
                        <div class="font-semibold text-gray-900">Livraison standard</div>
                        <div class="text-sm text-gray-500">5-7 jours ouvrés</div>
                      </div>
                      <span class="font-bold text-green-600">Gratuit</span>
                    </div>
                  </label>
                  <label class="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer">
                    <input
                      v-model="shippingForm.method"
                      type="radio"
                      value="express"
                      class="w-4 h-4 text-purple-600"
                    >
                    <div class="flex-1 flex justify-between items-center">
                      <div>
                        <div class="font-semibold text-gray-900">Livraison express</div>
                        <div class="text-sm text-gray-500">1-2 jours ouvrés</div>
                      </div>
                      <span class="font-bold text-purple-600">$9.99</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Continue Button -->
              <button
                type="submit"
                class="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Continuer vers le paiement
              </button>
            </form>
          </div>

          <!-- Payment Section (shown when step === 2) -->
          <div v-if="currentStep === 2" class="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span class="text-2xl">💳</span>
              <span>Informations de paiement</span>
            </h2>

            <form @submit.prevent="processPayment" class="space-y-6">
              <!-- Payment Methods -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Méthode de paiement - Lubumbashi</h3>
                <div class="grid grid-cols-2 gap-3">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors cursor-pointer"
                    :class="{ 'border-purple-500 bg-purple-50': paymentForm.method === method.id }"
                  >
                    <input
                      v-model="paymentForm.method"
                      type="radio"
                      :value="method.id"
                      class="sr-only"
                    >
                    <div class="text-center">
                      <div class="text-2xl mb-2" v-html="method.icon"></div>
                      <div class="text-sm font-semibold text-gray-700">{{ method.name }}</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Card Details (shown when Visa/Mastercard is selected) -->
              <div v-if="['visa', 'mastercard'].includes(paymentForm.method)" class="space-y-4">
                <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div class="flex items-center space-x-2 text-blue-800">
                    <span>ℹ️</span>
                    <span class="text-sm font-semibold">Simulation de paiement</span>
                  </div>
                  <p class="text-sm text-blue-600 mt-1">
                    Mode démo: utilisez les informations ci-dessous pour tester le paiement
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Numéro de carte</label>
                  <input
                    v-model="paymentForm.cardNumber"
                    type="text"
                    required
                    :placeholder="paymentForm.method === 'visa' ? '4111 1111 1111 1111' : '5555 5555 5555 4444'"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Date d'expiration</label>
                    <input
                      v-model="paymentForm.expiry"
                      type="text"
                      required
                      placeholder="12/26"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input
                      v-model="paymentForm.cvv"
                      type="text"
                      required
                      placeholder="123"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom sur la carte</label>
                  <input
                    v-model="paymentForm.cardName"
                    type="text"
                    required
                    placeholder="JOHN DOE"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                </div>
              </div>

              <!-- PayPal Info -->
              <div v-if="paymentForm.method === 'paypal'" class="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div class="flex items-center space-x-2 text-blue-800 mb-2">
                  <span>💡</span>
                  <span class="text-sm font-semibold">Paiement PayPal</span>
                </div>
                <p class="text-sm text-blue-600">
                  Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                </p>
              </div>

              <!-- Cinetpay Info -->
              <div v-if="paymentForm.method === 'cinetpay'" class="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div class="flex items-center space-x-2 text-orange-800 mb-2">
                  <span>🇨🇩</span>
                  <span class="text-sm font-semibold">Paiement Mobile - RDC</span>
                </div>
                <p class="text-sm text-orange-600">
                  Paiement via Cinetpay: Orange Money, Airtel Money, Vodacom M-Pesa disponibles.
                </p>
              </div>

              <!-- Finaliser Button -->
              <button
                type="submit"
                :disabled="isProcessing"
                class="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isProcessing" class="flex items-center justify-center space-x-2">
                  <span>🔒</span>
                  <span>Finaliser ma commande • ${{ totalWithShipping.toFixed(2) }}</span>
                </span>
                <span v-else class="flex items-center justify-center space-x-2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Traitement en cours...</span>
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:sticky lg:top-8 h-fit">
          <div class="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span class="text-2xl">📋</span>
              <span>Récapitulatif de commande</span>
            </h2>

            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl"
              >
                <img
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded-xl shadow-md"
                >
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-500">{{ item.selectedVariant?.name || 'Standard' }}</p>
                  <p class="text-sm text-gray-500">Quantité: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <div class="font-bold text-purple-600">
                    ${{ ((item.selectedVariant?.price || item.product.price) * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t border-gray-200 pt-6 space-y-3">
              <div class="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span>${{ shippingCost.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>TVA (16%)</span>
                <span>${{ taxAmount.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span class="text-purple-600">${{ totalWithShipping.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Security Info -->
            <div class="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div class="flex items-center space-x-2">
                <span class="text-green-600">🔒</span>
                <span class="text-sm font-semibold text-green-800">Paiement 100% sécurisé</span>
              </div>
              <p class="text-sm text-green-600 mt-1">
                Vos informations sont protégées par un cryptage SSL 256-bit
              </p>
            </div>

            <!-- Guarantees -->
            <div class="mt-4 space-y-2">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span>✅</span>
                <span>Garantie satisfait ou remboursé 30 jours</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span>🚚</span>
                <span>Livraison gratuite dès $50 à Lubumbashi</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span>💎</span>
                <span>Support client VVS premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useNotificationsStore } from '@/store/notifications'

const router = useRouter()
const cartStore = useCartStore()
const notifications = useNotificationsStore()

const currentStep = ref(1)
const isProcessing = ref(false)

// Forms
const shippingForm = ref({
  firstName: '',
  lastName: '',
  address: '',
  zipCode: '',
  city: 'Lubumbashi',
  country: 'CD',
  phone: '',
  method: 'standard'
})

const paymentForm = ref({
  method: 'visa',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: ''
})

const paymentMethods = [
  { 
    id: 'visa', 
    name: 'Visa', 
    icon: '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzE2NTRCQSIvPgo8cGF0aCBkPSJNMTYuNzMzIDEwLjY4TDE4LjEzMyA2SDIwLjY0TDE4LjUzMyAxN0gxNi4wOTNMMTYuNzMzIDEwLjY4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEzLjM5IDEwLjY3NUwxMi4yMTggNi4wMjVIMTMuNzcyTDE0LjU0NSA5LjU5TDE1Ljk2NyA2SDEzLjU0NUwxMy4zOSAxMC42NzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="Visa" class="w-10 h-6">'
  },
  { 
    id: 'mastercard', 
    name: 'Mastercard', 
    icon: '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNS41IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRjU1MDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQuNSIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRkY1NTAwIi8+Cjwvc3ZnPgo=" alt="Mastercard" class="w-10 h-6">'
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    icon: '<div class="text-2xl text-blue-600 font-bold">PayPal</div>'
  },
  { 
    id: 'cinetpay', 
    name: 'Cinetpay', 
    icon: '<div class="text-lg font-bold text-orange-600">🇨🇩 Mobile</div>'
  }
]

// Computed values
const shippingCost = computed(() => {
  return shippingForm.value.method === 'express' ? 9.99 : 0
})

const taxAmount = computed(() => {
  return (cartStore.totalPrice + shippingCost.value) * 0.16 // 16% TVA in DRC
})

const totalWithShipping = computed(() => {
  return cartStore.totalPrice + shippingCost.value + taxAmount.value
})

const proceedToPayment = () => {
  currentStep.value = 2
  // Update progress bar
  const progressBar = document.querySelector('.w-1/2')
  if (progressBar) {
    progressBar.classList.remove('w-1/2')
    progressBar.classList.add('w-full')
  }
  
  // Update step indicators
  const step2Circle = document.querySelector('.bg-gray-200')
  const step2Text = document.querySelector('.text-gray-500')
  if (step2Circle && step2Text) {
    step2Circle.classList.remove('bg-gray-200')
    step2Circle.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-indigo-600')
    step2Circle.querySelector('span')?.classList.remove('text-gray-500')
    step2Circle.querySelector('span')?.classList.add('text-white')
    step2Text.classList.remove('text-gray-500')
    step2Text.classList.add('text-gray-900')
  }
}

const processPayment = async () => {
  isProcessing.value = true
  
  try {
    // Enhanced payment simulation based on method
    let processingTime = 3000
    let successMessage = 'Votre commande a été traitée avec succès.'
    
    switch (paymentForm.value.method) {
      case 'visa':
        processingTime = 2000
        successMessage = 'Paiement Visa validé avec succès!'
        break
      case 'mastercard':
        processingTime = 2500
        successMessage = 'Paiement Mastercard confirmé!'
        break
      case 'paypal':
        processingTime = 1500
        successMessage = 'Paiement PayPal effectué avec succès!'
        break
      case 'cinetpay':
        processingTime = 3500
        successMessage = 'Paiement mobile Cinetpay confirmé depuis Lubumbashi!'
        break
    }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, processingTime))
    
    // Clear cart
    cartStore.clearCart()
    
    // Show success notification
    notifications.addNotification({
      type: 'success',
      title: 'Commande confirmée !',
      message: `${successMessage} Vous recevrez un email de confirmation.`,
      duration: 5000
    })
    
    // Redirect to success page
    router.push('/order-success')
  } catch (error) {
    notifications.addNotification({
      type: 'error',
      title: 'Erreur de paiement',
      message: 'Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.',
      duration: 5000
    })
  } finally {
    isProcessing.value = false
  }
}
</script>
