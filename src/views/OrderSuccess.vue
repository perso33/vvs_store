<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Success Animation -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl mb-6 animate-bounce">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-black text-gray-900 mb-4">
          Commande confirmée !
        </h1>
        <p class="text-xl text-gray-600 mb-2">
          Merci pour votre achat sur VVS Store
        </p>
        <p class="text-lg text-gray-500">
          Votre commande #{{ orderId }} a été traitée avec succès
        </p>
      </div>

      <!-- Order Details Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 border border-green-100 mb-8">
        <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Détails de votre commande</h2>
            <p class="text-gray-500">Commande passée le {{ orderDate }}</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-black text-green-600">{{ orderTotal }} €</div>
            <div class="text-sm text-gray-500">TVA incluse</div>
          </div>
        </div>

        <!-- What's Next -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <div class="text-4xl mb-3">📧</div>
            <h3 class="font-bold text-gray-900 mb-2">Email de confirmation</h3>
            <p class="text-sm text-gray-600">Vous recevrez un email avec tous les détails de votre commande</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <div class="text-4xl mb-3">📦</div>
            <h3 class="font-bold text-gray-900 mb-2">Préparation</h3>
            <p class="text-sm text-gray-600">Nous préparons votre commande avec le plus grand soin</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
            <div class="text-4xl mb-3">🚚</div>
            <h3 class="font-bold text-gray-900 mb-2">Livraison</h3>
            <p class="text-sm text-gray-600">Livraison estimée sous {{ deliveryTime }}</p>
          </div>
        </div>

        <!-- Tracking Info -->
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <span class="text-2xl">📍</span>
            <span>Suivi de commande</span>
          </h3>
          <p class="text-gray-600 mb-4">
            Vous recevrez un numéro de suivi par email une fois votre commande expédiée.
            Vous pourrez suivre votre colis en temps réel.
          </p>
          <div class="flex items-center space-x-2 text-sm text-purple-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Nous vous tiendrons informé à chaque étape</span>
          </div>
        </div>

        <!-- Customer Service -->
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <span class="text-2xl">💬</span>
            <span>Besoin d'aide ?</span>
          </h3>
          <p class="text-gray-600 mb-4">
            Notre équipe VVS est là pour vous accompagner. N'hésitez pas à nous contacter pour toute question.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="mailto:support@vvsstore.com" class="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
              <span>📧</span>
              <span>support@vvsstore.com</span>
            </a>
            <a href="tel:+33123456789" class="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
              <span>📞</span>
              <span>+33 1 23 45 67 89</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg text-center"
        >
          Continuer mes achats
        </router-link>
        <router-link
          to="/orders"
          class="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl border-2 border-purple-200 hover:bg-purple-50 transition-all text-center"
        >
          Mes commandes
        </router-link>
      </div>

      <!-- Social Sharing -->
      <div class="text-center mt-8">
        <p class="text-gray-500 mb-4">Partagez votre expérience VVS Store</p>
        <div class="flex justify-center space-x-4">
          <button class="w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center">
            <span class="text-xl">📘</span>
          </button>
          <button class="w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors flex items-center justify-center">
            <span class="text-xl">🐦</span>
          </button>
          <button class="w-12 h-12 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center">
            <span class="text-xl">📷</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const orderId = ref('')
const orderDate = ref('')
const orderTotal = ref('0.00')
const deliveryTime = ref('5-7 jours ouvrés')

onMounted(() => {
  // Generate order ID
  orderId.value = 'VVS' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  // Set order date
  orderDate.value = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  
  // Get order total from localStorage or session
  const savedTotal = localStorage.getItem('lastOrderTotal')
  if (savedTotal) {
    orderTotal.value = savedTotal
    localStorage.removeItem('lastOrderTotal')
  }
})
</script>
