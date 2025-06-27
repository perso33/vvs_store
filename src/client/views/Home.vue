<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStoresStore } from '@/store/stores'
import { useProductsStore } from '@/store/products'
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from '@heroicons/vue/24/outline'
import { formatPrice } from '@/utils/helpers'

const storesStore = useStoresStore()
const productsStore = useProductsStore()

const featuredStores = computed(() => storesStore.activeStores.slice(0, 3))
const featuredProducts = computed(() => productsStore.products.slice(0, 6))

onMounted(async () => {
  await Promise.all([
    storesStore.fetchStores(),
    productsStore.fetchProducts(),
  ])
})

const features = [
  {
    name: 'Livraison rapide',
    description: 'Livraison sous 24-48h partout en France',
    icon: TruckIcon,
  },
  {
    name: 'Paiement sécurisé',
    description: 'Vos données sont protégées',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Plusieurs moyens de paiement',
    description: 'CB, PayPal, Virement',
    icon: CreditCardIcon,
  },
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Votre marketplace
            <span class="block text-primary-200">multi-boutiques</span>
          </h1>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-up">
            Découvrez des milliers de produits de qualité dans nos boutiques partenaires.
            Une expérience d'achat unique et sécurisée.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
            <RouterLink
              to="/products"
              class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <ShoppingBagIcon class="w-5 h-5 mr-2" />
              Découvrir les produits
            </RouterLink>
            <RouterLink
              to="/login"
              class="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg font-semibold transition-all"
            >
              Devenir vendeur
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Une expérience d'achat optimisée avec des services de qualité
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div class="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.name }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Stores Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              Boutiques à la une
            </h2>
            <p class="text-lg text-gray-600">
              Découvrez nos boutiques partenaires
            </p>
          </div>
          <RouterLink
            to="/stores"
            class="btn-outline hidden sm:flex"
          >
            <BuildingStorefrontIcon class="w-4 h-4 mr-2" />
            Voir toutes les boutiques
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RouterLink
            v-for="store in featuredStores"
            :key="store.id"
            :to="`/stores/${store.id}`"
            class="group"
          >
            <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
              <div class="aspect-video w-full bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                <img
                  v-if="store.banner"
                  :src="store.banner"
                  :alt="store.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="flex items-center space-x-3">
                    <img
                      v-if="store.logo"
                      :src="store.logo"
                      :alt="store.name"
                      class="w-12 h-12 rounded-lg bg-white object-cover"
                    />
                    <div>
                      <h3 class="text-white font-semibold text-lg">{{ store.name }}</h3>
                      <p class="text-white/80 text-sm">Boutique officielle</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ store.description }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-8 sm:hidden">
          <RouterLink
            to="/stores"
            class="btn-outline"
          >
            <BuildingStorefrontIcon class="w-4 h-4 mr-2" />
            Voir toutes les boutiques
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              Produits populaires
            </h2>
            <p class="text-lg text-gray-600">
              Les coups de cœur de nos clients
            </p>
          </div>
          <RouterLink
            to="/products"
            class="btn-outline hidden sm:flex"
          >
            <SparklesIcon class="w-4 h-4 mr-2" />
            Voir tous les produits
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <RouterLink
            v-for="product in featuredProducts"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="group"
          >
            <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
              <div class="aspect-square w-full bg-gray-100 relative overflow-hidden">
                <img
                  v-if="product.images[0]"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-3 right-3">
                  <span
                    v-if="product.status === 'active'"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    Disponible
                  </span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-2">
                  <span>{{ product.category }}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {{ product.name }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {{ product.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-primary-600">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span class="text-sm text-gray-500">
                    Stock: {{ product.stock }}
                  </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-8 sm:hidden">
          <RouterLink
            to="/products"
            class="btn-outline"
          >
            <SparklesIcon class="w-4 h-4 mr-2" />
            Voir tous les produits
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Prêt à commencer ?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers de clients satisfaits et découvrez notre sélection de produits.
        </p>
        <RouterLink
          to="/register"
          class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
        >
          Créer un compte gratuitement
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
