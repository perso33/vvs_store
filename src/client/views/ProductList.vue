<template>
  <div class="min-h-screen bg-gray-50 py-3 sm:py-8">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-4 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ localeStore.t('nav.products') }}</h1>
        <p class="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">{{ localeStore.t('productList.subtitle') }}</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-4 sm:mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button 
              @click="selectedCategory = ''"
              :class="selectedCategory === '' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              {{ localeStore.t('common.all') }}
            </button>
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectedCategory = category"
              :class="selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              {{ category }}
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <label class="text-sm font-medium text-gray-700">{{ localeStore.t('productList.sortBy') }}:</label>
            <select 
              v-model="sortBy"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
            >
              <option value="name">{{ localeStore.t('productList.sortName') }}</option>
              <option value="price">{{ localeStore.t('productList.sortPrice') }}</option>
              <option value="created">{{ localeStore.t('productList.sortNewest') }}</option>
            </select>
          </div>
        </div>

        <!-- Search -->
        <div class="mt-4 max-w-full sm:max-w-md">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="localeStore.t('productList.searchPlaceholder')"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        <div v-for="n in 8" :key="n" class="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div class="h-32 sm:h-64 bg-gray-200"></div>
          <div class="p-2 sm:p-4 space-y-2 sm:space-y-3">
            <div class="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-6 sm:h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-8 sm:py-12">
        <svg class="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ localeStore.t('productList.noProducts') }}</h3>
        <p class="mt-1 text-xs sm:text-sm text-gray-500">{{ localeStore.t('productList.noProductsDesc') }}</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
        >
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <img 
              :src="product.images[0]" 
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            <!-- Badges -->
            <div class="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col space-y-1">
              <span v-if="product.promotionalPrice" 
                    class="bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                PROMO
              </span>
              <span v-if="product.tags.includes('new')" 
                    class="bg-green-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                NEW
              </span>
              <span v-if="product.tags.includes('bestseller')" 
                    class="bg-yellow-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                TOP
              </span>
              <span v-if="product.tags.includes('premium')" 
                    class="bg-purple-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                VIP
              </span>
            </div>

            <!-- Quick Actions - Hidden on mobile -->
            <div class="hidden sm:block absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-2 sm:p-4">
            <h3 class="text-sm sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2 leading-tight line-clamp-2">{{ product.name }}</h3>
            
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
              <div v-if="product.promotionalPrice" class="space-y-0.5 sm:space-y-1">
                <span class="text-sm sm:text-lg font-bold text-purple-600">
                  {{ localeStore.formatPrice(product.promotionalPrice) }}
                </span>
                <span class="text-xs sm:text-sm text-gray-500 line-through block">
                  {{ localeStore.formatPrice(product.price) }}
                </span>
              </div>
              <div v-else class="text-sm sm:text-lg font-bold text-gray-900">
                {{ localeStore.formatPrice(product.price) }}
              </div>
              
              <span class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{{ product.category }}</span>
            </div>

            <div class="flex items-center justify-between">
              <RouterLink 
                :to="`/product/${product.id}`"
                class="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {{ localeStore.t('common.viewDetails') }}
              </RouterLink>
              
              <button 
                @click="addToCart(product)"
                class="bg-purple-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-1"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H18M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zM20 19.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
                <span class="hidden sm:inline">{{ localeStore.t('common.addToCart') }}</span>
                <span class="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 sm:mt-12 flex justify-center">
        <nav class="inline-flex items-center space-x-1">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ localeStore.t('common.previous') }}
          </button>
          
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="page === currentPage 
              ? 'bg-purple-600 text-white border-purple-600' 
              : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'"
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium border"
          >
            {{ page }}
          </button>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ localeStore.t('common.next') }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import { useProductsStore } from '@/store/products'
import type { Product } from '@/types'

const cartStore = useCartStore()
const localeStore = useLocaleStore()
const productsStore = useProductsStore()

const loading = ref(true)
const selectedCategory = ref('')
const sortBy = ref('name')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 12

const categories = computed(() => {
  const cats = new Set(productsStore.products.map(p => p.category))
  return Array.from(cats).sort()
})

const filteredProducts = computed(() => {
  let products = [...productsStore.products]
  
  // Filter by category
  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // Sort products
  products.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        const priceA = a.promotionalPrice || a.price
        const priceB = b.promotionalPrice || b.price
        return priceA - priceB
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })
  
  return products
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const range = 5
  const start = Math.max(1, currentPage.value - Math.floor(range / 2))
  const end = Math.min(totalPages.value, start + range - 1)
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1)
  cartStore.openCart()
}

onMounted(async () => {
  await productsStore.fetchProducts()
  loading.value = false
})
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
