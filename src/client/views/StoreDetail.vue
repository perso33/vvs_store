<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Store Header -->
    <div class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto">
        <!-- Store Hero Section -->
        <div class="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 overflow-hidden">
          <div class="absolute inset-0 bg-black/20"></div>
          <img 
            :src="store.banner || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'" 
            alt="Store Banner" 
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 flex items-end">
            <div class="w-full px-3 sm:px-6 lg:px-8 pb-4 sm:pb-8">
              <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <div class="relative">
                  <div class="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white">
                    <img 
                      :src="store.logo || 'https://via.placeholder.com/128x128/6366f1/ffffff?text=' + store.name.charAt(0)" 
                      alt="Store Logo" 
                      class="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-xl sm:rounded-2xl object-cover"
                    >
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span class="text-white text-xs">✓</span>
                  </div>
                </div>
                <div class="text-white">
                  <h1 class="text-xl sm:text-2xl md:text-4xl font-black mb-1 sm:mb-2 leading-tight">{{ store.name }}</h1>
                  <p class="text-purple-100 text-xs sm:text-sm md:text-base mb-1 sm:mb-2 leading-tight">{{ store.description }}</p>
                  <div class="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                    <span class="flex items-center space-x-1">
                      <span class="text-yellow-400">⭐</span>
                      <span>{{ store.rating }}/5</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <span>📦</span>
                      <span>{{ store.productsCount }}</span>
                    </span>
                    <span class="hidden sm:flex items-center space-x-1">
                      <span>👥</span>
                      <span>{{ store.followersCount }} followers</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Store Navigation -->
        <div class="border-b border-gray-200">
          <div class="px-3 sm:px-6 lg:px-8">
            <nav class="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Content -->
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="space-y-4 sm:space-y-8">
        <!-- Filter Section -->
        <div class="bg-white rounded-2xl shadow-lg p-3 sm:p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div class="flex flex-wrap gap-2 sm:gap-3">
              <button
                v-for="filter in productFilters"
                :key="filter.id"
                @click="activeFilter = filter.id"
                :class="[
                  'px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200',
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ filter.name }}
              </button>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
              <select class="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
                <option>Mieux notés</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div class="relative">
              <img
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute top-3 left-3">
                <span
                  v-if="product.isPromo"
                  class="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
                >
                  -{{ product.promoPercent }}%
                </span>
                <span
                  v-else-if="product.isNew"
                  class="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
                >
                  Nouveau
                </span>
              </div>
              <button class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400 text-sm">⭐</span>
                  <span class="text-sm text-gray-600">{{ product.rating }}</span>
                </div>
                <span class="text-xs text-gray-500">{{ product.soldCount }} vendus</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span v-if="product.isPromo" class="text-lg font-bold text-purple-600">
                    {{ localeStore.formatPrice(product.promoPrice || 0) }}
                  </span>
                  <span
                    :class="[
                      'font-bold',
                      product.isPromo ? 'text-sm text-gray-400 line-through' : 'text-lg text-purple-600'
                    ]"
                  >
                    {{ localeStore.formatPrice(product.price) }}
                  </span>
                </div>
                <button
                  @click="addToCart(product)"
                  class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center">
          <button class="bg-white border-2 border-purple-200 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
            Charger plus de produits
          </button>
        </div>
      </div>

      <!-- About Tab -->
      <div v-else-if="activeTab === 'about'" class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Store Info -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">À propos de {{ store.name }}</h2>
            <p class="text-gray-600 mb-6">{{ store.longDescription }}</p>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📍</span>
                <div>
                  <div class="font-medium text-gray-900">Adresse</div>
                  <div class="text-gray-600">{{ store.address }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">📞</span>
                <div>
                  <div class="font-medium text-gray-900">Téléphone</div>
                  <div class="text-gray-600">{{ store.phone }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-2xl">✉️</span>
                <div>
                  <div class="font-medium text-gray-900">Email</div>
                  <div class="text-gray-600">{{ store.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Store Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Statistiques</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-purple-50 rounded-xl">
                <div class="text-2xl font-bold text-purple-600">{{ store.productsCount }}</div>
                <div class="text-sm text-gray-600">Produits</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-xl">
                <div class="text-2xl font-bold text-green-600">{{ store.ordersCount }}</div>
                <div class="text-sm text-gray-600">Commandes</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-xl">
                <div class="text-2xl font-bold text-blue-600">{{ store.followersCount }}</div>
                <div class="text-sm text-gray-600">Followers</div>
              </div>
              <div class="text-center p-4 bg-yellow-50 rounded-xl">
                <div class="text-2xl font-bold text-yellow-600">{{ store.rating }}/5</div>
                <div class="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-else-if="activeTab === 'reviews'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Avis clients</h2>
          <div class="space-y-4">
            <div
              v-for="review in store.reviews"
              :key="review.id"
              class="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
            >
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-semibold">{{ review.userName.charAt(0) }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <div class="font-medium text-gray-900">{{ review.userName }}</div>
                    <div class="flex items-center space-x-1">
                      <span class="text-yellow-400">⭐</span>
                      <span class="text-sm text-gray-600">{{ review.rating }}/5</span>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm">{{ review.comment }}</p>
                  <div class="text-xs text-gray-400 mt-2">{{ review.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Stores Section -->
    <div class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Magasins similaires</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="similarStore in similarStores"
            :key="similarStore.id"
            class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
            @click="$router.push(`/stores/${similarStore.id}`)"
          >
            <div class="relative h-32 bg-gradient-to-r from-purple-400 to-indigo-500">
              <img
                :src="similarStore.banner"
                alt=""
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute bottom-4 left-4">
                <div class="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <img
                    :src="similarStore.logo"
                    alt=""
                    class="w-10 h-10 rounded-lg object-cover"
                  >
                </div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-1">{{ similarStore.name }}</h3>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ similarStore.description }}</p>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-gray-600">{{ similarStore.rating }}</span>
                </div>
                <span class="text-gray-500">{{ similarStore.productsCount }} produits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import type { Product } from '@/types'

const route = useRoute()
const cartStore = useCartStore()
const localeStore = useLocaleStore()

const activeTab = ref('products')
const activeFilter = ref('all')

const tabs = [
  { id: 'products', name: 'Produits' },
  { id: 'about', name: 'À propos' },
  { id: 'reviews', name: 'Avis' },
]

const productFilters = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'new', name: 'Nouveautés' },
  { id: 'promo', name: 'Promotions' },
  { id: 'bestseller', name: 'Best-sellers' },
]

// Mock store data
const store = ref({
  id: route.params.id,
  name: 'TechStore Pro',
  description: 'Votre destination premium pour la technologie de pointe',
  longDescription: 'TechStore Pro est votre partenaire de confiance pour tous vos besoins technologiques. Nous proposons une sélection rigoureuse des meilleurs produits électroniques, gadgets innovants et accessoires high-tech. Notre équipe d\'experts est à votre disposition pour vous conseiller et vous accompagner dans vos achats.',
  logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80',
  banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  rating: 4.8,
  productsCount: 1247,
  followersCount: 15420,
  ordersCount: 8934,
  address: 'Avenue Sendwe, Lubumbashi, RDC',
  phone: '+243 123 456 789',
  email: 'contact@techstore.cd',
  reviews: [
    {
      id: 1,
      userName: 'Marie K.',
      rating: 5,
      comment: 'Excellent service ! Produits de qualité et livraison rapide.',
      date: '15 juin 2025'
    },
    {
      id: 2,
      userName: 'Jean P.',
      rating: 4,
      comment: 'Très satisfait de mon achat. Je recommande vivement.',
      date: '12 juin 2025'
    },
    {
      id: 3,
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Boutique sérieuse, produits conformes aux descriptions.',
      date: '10 juin 2025'
    }
  ]
})

// Mock products data
const products = ref<Product[]>([
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 1299,
    promoPrice: 1199,
    isPromo: true,
    promoPercent: 8,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    soldCount: 342,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Smartphones',
    description: 'Le summum de la technologie Apple',
    storeId: '1',
    stock: 25,
    status: 'active',
    tags: ['smartphone', 'apple', 'premium'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'MacBook Pro 16" M3',
    price: 2499,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    soldCount: 156,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Ordinateurs',
    description: 'Performance exceptionnelle pour les professionnels',
    storeId: '1',
    stock: 12,
    status: 'active',
    tags: ['laptop', 'apple', 'professional'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'AirPods Pro 3ème génération',
    price: 299,
    promoPrice: 249,
    isPromo: true,
    promoPercent: 17,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    soldCount: 892,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Audio',
    description: 'Son premium avec réduction de bruit active',
    storeId: '1',
    stock: 45,
    status: 'active',
    tags: ['headphones', 'wireless', 'audio'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Apple Watch Series 9',
    price: 449,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    soldCount: 234,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Montres',
    description: 'La montre connectée la plus avancée',
    storeId: '1',
    stock: 38,
    status: 'active',
    tags: ['smartwatch', 'apple', 'fitness'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" M2',
    price: 1199,
    promoPrice: 999,
    isPromo: true,
    promoPercent: 17,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    soldCount: 445,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tablettes',
    description: 'Créativité et productivité sans limites',
    storeId: '1',
    stock: 22,
    status: 'active',
    tags: ['tablet', 'apple', 'creative'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Magic Keyboard pour iPad',
    price: 349,
    isPromo: false,
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    soldCount: 123,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Accessoires',
    description: 'Clavier premium avec trackpad intégré',
    storeId: '1',
    stock: 67,
    status: 'active',
    tags: ['keyboard', 'apple', 'accessory'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
])

// Mock similar stores
const similarStores = ref([
  {
    id: '2',
    name: 'ElectroMax',
    description: 'Électronique et gadgets high-tech',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    banner: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    productsCount: 892,
  },
  {
    id: '3',
    name: 'GadgetWorld',
    description: 'Le monde des gadgets innovants',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    productsCount: 654,
  },
  {
    id: '4',
    name: 'TechHub',
    description: 'Votre hub technologique',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    productsCount: 1123,
  },
])

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return products.value
  if (activeFilter.value === 'new') return products.value.filter(p => p.isNew)
  if (activeFilter.value === 'promo') return products.value.filter(p => p.isPromo)
  if (activeFilter.value === 'bestseller') return products.value.filter(p => p.isBestSeller)
  return products.value
})

const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1)
}

onMounted(() => {
  // Simulate loading store data
  console.log('Loading store details for:', route.params.id)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
