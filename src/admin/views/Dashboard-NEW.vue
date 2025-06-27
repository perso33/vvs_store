<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b border-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard Admin VVS
            </h1>
            <p class="text-gray-600 mt-1">Gérez votre marketplace premium en temps réel</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
              <div class="text-sm text-gray-500">Dernier accès</div>
              <div class="text-sm font-semibold text-gray-900">Aujourd'hui à 14:30</div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-sm">A</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="stat in stats" 
          :key="stat.name"
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">{{ stat.name }}</p>
              <p class="text-3xl font-black text-gray-900 mt-2">{{ stat.value }}</p>
              <div class="flex items-center mt-2">
                <span class="text-green-600 text-sm font-semibold">+{{ stat.growth }}%</span>
                <span class="text-gray-500 text-sm ml-2">vs mois dernier</span>
              </div>
            </div>
            <div :class="[stat.bgColor, 'p-4 rounded-2xl']">
              <component :is="stat.icon" :class="[stat.color, 'w-8 h-8']" />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span class="text-2xl">⚡</span>
          <span>Actions rapides</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link
            to="/admin/stores"
            class="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all group"
          >
            <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white text-lg">🏪</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900">Gérer les boutiques</div>
              <div class="text-sm text-gray-500">{{ storesStore.stores.length }} boutiques</div>
            </div>
          </router-link>
          
          <button class="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group">
            <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white text-lg">📊</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900">Rapports</div>
              <div class="text-sm text-gray-500">Analytics avancées</div>
            </div>
          </button>
          
          <button class="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all group">
            <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white text-lg">👥</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900">Utilisateurs</div>
              <div class="text-sm text-gray-500">Gérer les comptes</div>
            </div>
          </button>
          
          <button class="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all group">
            <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white text-lg">⚙️</span>
            </div>
            <div>
              <div class="font-semibold text-gray-900">Paramètres</div>
              <div class="text-sm text-gray-500">Configuration</div>
            </div>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Stores -->
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <span class="text-2xl">🏪</span>
              <span>Boutiques récentes</span>
            </h2>
            <router-link 
              to="/admin/stores"
              class="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center space-x-1"
            >
              <span>Voir tout</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
          <div class="space-y-4">
            <div 
              v-for="store in recentStores" 
              :key="store.id"
              class="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-purple-50 hover:to-indigo-50 transition-all group cursor-pointer"
            >
              <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-white font-bold">{{ store.name.charAt(0) }}</span>
              </div>
              <div class="flex-1">
                <div class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{{ store.name }}</div>
                <div class="text-sm text-gray-500">{{ store.description }}</div>
              </div>
              <div class="text-right">
                <div :class="store.status === 'active' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'" 
                     class="text-xs font-semibold px-2 py-1 rounded-full">
                  {{ store.status === 'active' ? '✓ Actif' : '⏳ En attente' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Chart -->
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span class="text-2xl">📈</span>
            <span>Performance VVS</span>
          </h2>
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div>
                <div class="text-sm text-gray-600">Revenus aujourd'hui</div>
                <div class="text-2xl font-bold text-green-600">€8,425</div>
              </div>
              <div class="text-green-600">
                <span class="text-2xl">💰</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div>
                <div class="text-sm text-gray-600">Commandes traitées</div>
                <div class="text-2xl font-bold text-blue-600">342</div>
              </div>
              <div class="text-blue-600">
                <span class="text-2xl">📦</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div>
                <div class="text-sm text-gray-600">Nouveaux utilisateurs</div>
                <div class="text-2xl font-bold text-purple-600">127</div>
              </div>
              <div class="text-purple-600">
                <span class="text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mt-8 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span class="text-2xl">🔔</span>
          <span>Activité récente</span>
        </h2>
        <div class="space-y-4">
          <div 
            v-for="activity in recentActivity" 
            :key="activity.id"
            class="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div :class="activity.color" class="w-10 h-10 rounded-full flex items-center justify-center">
              <span class="text-white text-sm">{{ activity.icon }}</span>
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-900">{{ activity.title }}</div>
              <div class="text-sm text-gray-500">{{ activity.description }}</div>
            </div>
            <div class="text-sm text-gray-400">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStoresStore } from '@/store/stores'
import { useProductsStore } from '@/store/products'
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  UsersIcon,
  CurrencyEuroIcon,
} from '@heroicons/vue/24/outline'

const storesStore = useStoresStore()
const productsStore = useProductsStore()

const stats = computed(() => [
  {
    name: 'Boutiques totales',
    value: storesStore.totalStores.toLocaleString(),
    icon: BuildingStorefrontIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    growth: 12
  },
  {
    name: 'Produits totaux',
    value: productsStore.totalProducts.toLocaleString(),
    icon: ShoppingBagIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    growth: 8
  },
  {
    name: 'Boutiques actives',
    value: storesStore.activeStores.length.toLocaleString(),
    icon: UsersIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    growth: 15
  },
  {
    name: 'Revenus ce mois',
    value: '€142,567',
    icon: CurrencyEuroIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    growth: 23
  },
])

const recentStores = computed(() => storesStore.stores.slice(0, 5))

const recentActivity = [
  {
    id: 1,
    icon: '🏪',
    title: 'Nouvelle boutique créée',
    description: 'TechWorld Store a rejoint la plateforme',
    time: 'Il y a 2h',
    color: 'bg-green-500'
  },
  {
    id: 2,
    icon: '🛒',
    title: 'Commande importante',
    description: 'Commande de €2,450 sur Fashion Elite',
    time: 'Il y a 4h',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    icon: '⚠️',
    title: 'Alerte stock',
    description: 'Produit en rupture chez ElectroMax',
    time: 'Il y a 6h',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    icon: '✅',
    title: 'Boutique approuvée',
    description: 'HomeDecor Pro validée pour la vente',
    time: 'Il y a 8h',
    color: 'bg-purple-500'
  }
]

onMounted(async () => {
  await Promise.all([
    storesStore.fetchStores(),
    productsStore.fetchProducts(),
  ])
})
</script>
