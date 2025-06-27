<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
    <!-- Header -->
    <div class="bg-white shadow-lg border-b border-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
              <div class="text-sm font-semibold text-gray-900">{{ formatDate(myStore.createdAt.toString()) }}</div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-sm">V</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <!-- No Store State -->
      <div v-if="!myStore" class="text-center py-12">
        <div class="text-6xl md:text-8xl mb-6">🏪</div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Créez votre boutique VVS</h2>
        <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre marketplace premium et commencez à vendre vos produits à des millions d'acheteurs dans le monde entier
        </p>
        <button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
          Créer ma boutique
        </button>
      </div>

      <!-- Store Dashboard -->
      <div v-else class="space-y-6 md:space-y-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div 
            v-for="stat in stats" 
            :key="stat.name"
            class="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-xl border border-gray-100 hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">{{ stat.name }}</p>
                <p class="text-xl md:text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
                <div class="flex items-center mt-2">
                  <span class="text-xs md:text-sm" :class="stat.change >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ stat.change >= 0 ? '+' : '' }}{{ stat.change }}%
                  </span>
                  <span class="text-xs md:text-sm text-gray-500 ml-2">vs mois dernier</span>
                </div>
              </div>
              <div class="text-2xl md:text-3xl opacity-80">{{ stat.icon }}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 p-6">
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
                <div class="font-semibold text-gray-900">Ajouter</div>
                <div class="text-sm text-gray-500">Produit</div>
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
                <div class="font-semibold text-gray-900">Inventaire</div>
                <div class="text-sm text-gray-500">{{ myStoreProducts.length }} produits</div>
              </div>
            </router-link>
            
            <router-link
              to="/vendor/orders"
              class="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all group"
            >
              <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">📋</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Commandes</div>
                <div class="text-sm text-gray-500">{{ pendingOrders }} en attente</div>
              </div>
            </router-link>
            
            <router-link
              to="/vendor/settings"
              class="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all group"
            >
              <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-white text-lg">⚙️</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Paramètres</div>
                <div class="text-sm text-gray-500">Boutique</div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sales Overview -->
          <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <span class="text-2xl">📊</span>
                <span>Aperçu des ventes</span>
              </h2>
              <select class="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>90 derniers jours</option>
              </select>
            </div>
            
            <!-- Sales Chart Area -->
            <div class="space-y-6">
              <!-- Revenue Chart -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-gray-600">Revenus quotidiens</span>
                  <span class="text-lg font-bold text-green-600">{{ localeStore.formatPrice(totalRevenue) }}</span>
                </div>
                <div class="h-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl flex items-end space-x-1 p-4">
                  <div 
                    v-for="(day, index) in salesData" 
                    :key="index"
                    class="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-600 hover:to-green-500"
                    :style="{ height: `${(day.revenue / maxRevenue) * 100}%`, minHeight: '8px' }"
                    :title="`${day.date}: ${localeStore.formatPrice(day.revenue)}`"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span v-for="(day, index) in salesData" :key="index">{{ day.date }}</span>
                </div>
              </div>

              <!-- Orders Chart -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-gray-600">Commandes quotidiennes</span>
                  <span class="text-lg font-bold text-blue-600">{{ totalOrders }} commandes</span>
                </div>
                <div class="h-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-end space-x-1 p-4">
                  <div 
                    v-for="(day, index) in salesData" 
                    :key="index"
                    class="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                    :style="{ height: `${(day.orders / maxOrders) * 100}%`, minHeight: '6px' }"
                    :title="`${day.date}: ${day.orders} commandes`"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="space-y-6">
            <!-- Top Products -->
            <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <span class="text-xl">🏆</span>
                <span>Top Produits</span>
              </h3>
              <div class="space-y-4">
                <div 
                  v-for="product in topProducts" 
                  :key="product.id"
                  class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span class="text-white text-xs font-bold">#{{ product.rank }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold text-gray-900 truncate">{{ product.name }}</div>
                    <div class="text-xs text-gray-500">{{ product.soldCount }} vendus</div>
                    <div class="text-sm font-bold text-green-600">{{ localeStore.formatPrice(product.revenue) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <span class="text-xl">📱</span>
                <span>Activité récente</span>
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="activity in recentActivity" 
                  :key="activity.id"
                  class="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm" :class="activity.color">
                    {{ activity.icon }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm text-gray-900">{{ activity.message }}</div>
                    <div class="text-xs text-gray-500">{{ activity.time }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stock Alerts -->
            <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <span class="text-xl">⚠️</span>
                <span>Alertes Stock</span>
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="product in lowStockProducts" 
                  :key="product.id"
                  class="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-200"
                >
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold text-gray-900 truncate">{{ product.name }}</div>
                    <div class="text-xs text-yellow-600 font-semibold">Stock: {{ product.stock }} unités</div>
                  </div>
                  <button class="text-purple-600 hover:text-purple-700 text-xs font-medium whitespace-nowrap">
                    Réapprovisionner
                  </button>
                </div>
              </div>
            </div>
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
import { useAuthStore } from '@/store/auth'
import { useLocaleStore } from '@/store/locale'

const storesStore = useStoresStore()
const productsStore = useProductsStore()
const authStore = useAuthStore()
const localeStore = useLocaleStore()

// Computed properties
const myStore = computed(() => {
  const user = authStore.user
  if (!user || user.role !== 'store_admin') return null
  return storesStore.stores.find(store => store.adminId === user.id)
})

const myStoreProducts = computed(() => {
  if (!myStore.value) return []
  return productsStore.products.filter(product => product.storeId === myStore.value?.id)
})

const stats = computed(() => [
  {
    name: 'Revenus',
    value: localeStore.formatPrice(totalRevenue.value),
    change: 12.5,
    icon: '💰'
  },
  {
    name: 'Commandes',
    value: totalOrders.value.toString(),
    change: 8.2,
    icon: '📦'
  },
  {
    name: 'Produits',
    value: myStoreProducts.value.length.toString(),
    change: 5.1,
    icon: '🏷️'
  },
  {
    name: 'Vues',
    value: totalViews.value.toString(),
    change: 15.3,
    icon: '👁️'
  }
])

const totalRevenue = computed(() => {
  return myStoreProducts.value.reduce((total, product) => {
    const price = product.isPromo && product.promoPrice ? product.promoPrice : product.price
    return total + (price * (product.soldCount || 0))
  }, 0)
})

const totalOrders = computed(() => {
  return myStoreProducts.value.reduce((total, product) => total + (product.soldCount || 0), 0)
})

const totalViews = computed(() => {
  return myStoreProducts.value.reduce((total, product) => total + (product.soldCount || 0) * 10, 0) // Estimation des vues basée sur les ventes
})

const pendingOrders = computed(() => Math.floor(totalOrders.value * 0.2))

const topProducts = computed(() => {
  return myStoreProducts.value
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 5)
    .map((product, index) => ({
      ...product,
      rank: index + 1,
      revenue: (product.isPromo && product.promoPrice ? product.promoPrice : product.price) * (product.soldCount || 0)
    }))
})

const lowStockProducts = computed(() => {
  return myStoreProducts.value
    .filter(product => product.stock <= 10)
    .slice(0, 3)
})

const salesData = computed(() => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const revenue = Math.floor(Math.random() * 2000) + 500
    const orders = Math.floor(Math.random() * 15) + 5
    days.push({
      date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      revenue,
      orders
    })
  }
  return days
})

const maxRevenue = computed(() => Math.max(...salesData.value.map(d => d.revenue)))
const maxOrders = computed(() => Math.max(...salesData.value.map(d => d.orders)))

const recentActivity = computed(() => [
  {
    id: 1,
    icon: '🛒',
    message: 'Nouvelle commande reçue',
    time: 'Il y a 5 min',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    icon: '👁️',
    message: '15 nouvelles vues sur vos produits',
    time: 'Il y a 1h',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    icon: '⭐',
    message: 'Nouvel avis 5 étoiles reçu',
    time: 'Il y a 3h',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 4,
    icon: '📦',
    message: 'Produit expédié',
    time: 'Il y a 6h',
    color: 'bg-purple-100 text-purple-600'
  }
])

// Helper functions
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  await Promise.all([
    storesStore.fetchStores(),
    productsStore.fetchProducts(),
  ])
})
</script>
