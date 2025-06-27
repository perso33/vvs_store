<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b border-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard Vendeur VVS
            </h1>
            <p class="text-gray-600 mt-1">
              <span v-if="myStore">Bienvenue dans votre boutique </span>
              <span v-else>Créez votre première boutique premium</span>
              <span v-if="myStore" class="font-semibold text-purple-600">{{ myStore.name }}</span>
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div v-if="myStore" class="text-right hidden sm:block">
              <div class="text-sm text-gray-500">Boutique créée le</div>
              <div class="text-sm font-semibold text-gray-900">{{ formatDate(myStore.createdAt) }}</div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-sm">V</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- No Store State -->
      <div v-if="!myStore" class="text-center py-12">
        <div class="text-8xl mb-6">🏪</div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Créez votre boutique VVS</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre marketplace premium et commencez à vendre vos produits à des millions d'acheteurs dans le monde entier
        </p>
        <button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
          Créer ma boutique
        </button>
      </div>

      <!-- Store Dashboard -->
      <div v-else>
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
                <div class="flex items-center mt-2" v-if="stat.growth">
                  <span class="text-green-600 text-sm font-semibold">+{{ stat.growth }}%</span>
                  <span class="text-gray-500 text-sm ml-2">ce mois</span>
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
              to="/vendor/products/new"
              class="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group"
            >
              <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">➕</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Ajouter produit</div>
                <div class="text-sm text-gray-500">Nouveau produit</div>
              </div>
            </router-link>
            
            <router-link
              to="/vendor/products"
              class="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all group"
            >
              <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">📦</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Mes produits</div>
                <div class="text-sm text-gray-500">{{ myProducts.length }} produits</div>
              </div>
            </router-link>
            
            <button class="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all group">
              <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">📊</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Analytics</div>
                <div class="text-sm text-gray-500">Statistiques</div>
              </div>
            </button>
            
            <router-link
              to="/vendor/settings"
              class="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all group"
            >
              <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">⚙️</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Paramètres</div>
                <div class="text-sm text-gray-500">Configuration</div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Products -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <span class="text-2xl">📦</span>
                <span>Mes produits récents</span>
              </h2>
              <router-link 
                to="/vendor/products"
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
                v-for="product in recentProducts" 
                :key="product.id"
                class="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-purple-50 hover:to-indigo-50 transition-all group cursor-pointer"
              >
                <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold">{{ product.name.charAt(0) }}</span>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{{ product.name }}</div>
                  <div class="text-sm text-gray-500">{{ product.category }}</div>
                  <div class="text-sm font-semibold text-purple-600">{{ product.price.toFixed(2) }} €</div>
                </div>
                <div class="text-right">
                  <div :class="product.status === 'active' ? 'text-green-600 bg-green-100' : product.status === 'draft' ? 'text-yellow-600 bg-yellow-100' : 'text-gray-600 bg-gray-100'" 
                       class="text-xs font-semibold px-2 py-1 rounded-full mb-2">
                    {{ getStatusText(product.status) }}
                  </div>
                  <div class="text-xs text-gray-500">Stock: {{ product.stock }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Store Performance -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span class="text-2xl">📈</span>
              <span>Performance boutique</span>
            </h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div>
                  <div class="text-sm text-gray-600">Ventes cette semaine</div>
                  <div class="text-2xl font-bold text-green-600">€1,245</div>
                </div>
                <div class="text-green-600">
                  <span class="text-2xl">💰</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div>
                  <div class="text-sm text-gray-600">Commandes en cours</div>
                  <div class="text-2xl font-bold text-blue-600">23</div>
                </div>
                <div class="text-blue-600">
                  <span class="text-2xl">📦</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div>
                  <div class="text-sm text-gray-600">Vues produits</div>
                  <div class="text-2xl font-bold text-purple-600">1,847</div>
                </div>
                <div class="text-purple-600">
                  <span class="text-2xl">👀</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <div>
                  <div class="text-sm text-gray-600">Note moyenne</div>
                  <div class="text-2xl font-bold text-yellow-600">4.8 ⭐</div>
                </div>
                <div class="text-yellow-600">
                  <span class="text-2xl">🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Store Tips -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 mt-8 text-white">
          <h2 class="text-2xl font-bold mb-6 flex items-center space-x-2">
            <span class="text-3xl">💡</span>
            <span>Conseils pour optimiser votre boutique VVS</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-2xl mb-3">📸</div>
              <h3 class="font-bold mb-2">Photos de qualité</h3>
              <p class="text-sm opacity-90">Utilisez des images haute résolution pour présenter vos produits sous leur meilleur jour</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-2xl mb-3">📝</div>
              <h3 class="font-bold mb-2">Descriptions détaillées</h3>
              <p class="text-sm opacity-90">Rédigez des descriptions complètes et précises pour rassurer vos clients</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div class="text-2xl mb-3">🚀</div>
              <h3 class="font-bold mb-2">Livraison rapide</h3>
              <p class="text-sm opacity-90">Proposez des options d'expédition rapide pour fidéliser votre clientèle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useStoresStore } from '@/store/stores'
import { useProductsStore } from '@/store/products'
import {
  ShoppingBagIcon,
  EyeIcon,
  CurrencyEuroIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const storesStore = useStoresStore()
const productsStore = useProductsStore()

const myStore = computed(() => {
  if (!authStore.user) return null
  return storesStore.getStoresByAdmin(authStore.user.id)[0]
})

const myProducts = computed(() => {
  if (!myStore.value) return []
  return productsStore.getProductsByStore(myStore.value.id)
})

const recentProducts = computed(() => myProducts.value.slice(0, 5))

const stats = computed(() => {
  if (!myStore.value) return []
  
  const products = myProducts.value
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  
  return [
    {
      name: 'Mes produits',
      value: products.length.toLocaleString(),
      icon: ShoppingBagIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      growth: 5
    },
    {
      name: 'Produits actifs',
      value: products.filter(p => p.status === 'active').length.toLocaleString(),
      icon: EyeIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      growth: 12
    },
    {
      name: 'Valeur stock',
      value: `€${totalValue.toLocaleString()}`,
      icon: CurrencyEuroIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      growth: 8
    },
    {
      name: 'Ventes ce mois',
      value: '€4,267',
      icon: ArrowTrendingUpIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      growth: 23
    },
  ]
})

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    active: '✓ Actif',
    inactive: '⏸️ Inactif', 
    draft: '📝 Brouillon'
  }
  return statusMap[status] || status
}

onMounted(async () => {
  await Promise.all([
    storesStore.fetchStores(),
    productsStore.fetchProducts(),
  ])
})
</script>
