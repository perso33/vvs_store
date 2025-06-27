<template>
  <div class="min-h-screen bg-gray-50 py-3 sm:py-8">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <!-- Breadcrumb - Hidden on mobile -->
      <nav class="hidden sm:block mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <RouterLink to="/" class="text-gray-500 hover:text-purple-600 transition-colors">
              {{ localeStore.t('nav.home') }}
            </RouterLink>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <RouterLink to="/products" class="text-gray-500 hover:text-purple-600 transition-colors">
              {{ localeStore.t('nav.products') }}
            </RouterLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">{{ localeStore.t('productDetail.title') }}</li>
        </ol>
      </nav>

      <div v-if="product" class="bg-white rounded-lg sm:shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-3 sm:p-6">
          <!-- Product Images -->
          <div class="space-y-3 sm:space-y-4">
            <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img 
                :src="mainImage" 
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-if="product.images.length > 1" class="grid grid-cols-4 gap-2">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="mainImage = image"
                class="aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-75 transition-opacity"
                :class="{ 'ring-2 ring-purple-500': mainImage === image }"
              >
                <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="space-y-4 sm:space-y-6">
            <div>
              <h1 class="text-xl sm:text-3xl font-bold text-gray-900 leading-tight">{{ product.name }}</h1>
              <p class="text-gray-600 mt-2 text-sm sm:text-base">{{ product.description }}</p>
            </div>
              <p class="text-gray-600 mt-2">{{ product.description }}</p>
            </div>

            <!-- Price -->
            <div class="space-y-2">
              <div v-if="product.promotionalPrice" class="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                <span class="text-2xl sm:text-3xl font-bold text-purple-600">
                  {{ localeStore.formatPrice(product.promotionalPrice) }}
                </span>
                <span class="text-lg sm:text-xl text-gray-500 line-through">
                  {{ localeStore.formatPrice(product.price) }}
                </span>
                <span class="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded w-fit">
                  {{ localeStore.t('common.promotion') }}
                </span>
              </div>
              <div v-else class="text-2xl sm:text-3xl font-bold text-gray-900">
                {{ localeStore.formatPrice(product.price) }}
              </div>
            </div>

            <!-- Tags/Badges -->
            <div class="flex flex-wrap gap-2">
              <span v-if="product.tags.includes('new')" 
                    class="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded">
                {{ localeStore.t('common.new') }}
              </span>
              <span v-if="product.tags.includes('bestseller')" 
                    class="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded">
                {{ localeStore.t('common.bestseller') }}
              </span>
              <span v-if="product.tags.includes('premium')" 
                    class="bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded">
                {{ localeStore.t('common.premium') }}
              </span>
            </div>

            <!-- Variants -->
            <div v-if="product.variants && product.variants.length > 0" class="space-y-3 sm:space-y-4">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">{{ localeStore.t('productDetail.options') }}</h3>
              <div class="space-y-3">
                <div v-for="(attributeGroup, attribute) in groupedVariants" :key="attribute" class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 capitalize">{{ attribute }}</label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="value in attributeGroup" 
                      :key="value"
                      @click="selectVariantAttribute(attribute as string, value as string)"
                      class="px-3 py-2 text-sm border rounded-md transition-colors"
                      :class="selectedAttributes[attribute as string] === value 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-300 hover:border-gray-400'"
                    >
                      {{ value }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">{{ localeStore.t('productDetail.quantity') }}</label>
              <div class="flex items-center space-x-3">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="text-lg sm:text-xl font-medium px-4">{{ quantity }}</span>
                <button 
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  :disabled="quantity >= product.stock"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p class="text-xs sm:text-sm text-gray-500">{{ product.stock }} {{ localeStore.t('productDetail.inStock') }}</p>
            </div>

            <!-- Add to Cart -->
            <div class="space-y-3 sm:space-y-4">
              <button 
                @click="addToCart"
                :disabled="product.stock === 0"
                class="w-full bg-purple-600 text-white px-6 py-3 sm:py-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H18M9 19.5a.5.5 0 11-1 0 .5.5 0 011 0zM20 19.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
                <span>{{ localeStore.t('common.addToCart') }}</span>
              </button>
              
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <button class="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="hidden sm:inline">{{ localeStore.t('productDetail.addToWishlist') }}</span>
                  <span class="sm:hidden">♡</span>
                </button>
                
                <button class="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span class="hidden sm:inline">{{ localeStore.t('productDetail.share') }}</span>
                  <span class="sm:hidden">↗</span>
                </button>
              </div>
            </div>

            <!-- Product Info - Hidden on mobile, moved to bottom -->
            <div class="hidden sm:block border-t pt-6 space-y-4">
              <div class="text-sm text-gray-600">
                <p><span class="font-medium">{{ localeStore.t('productDetail.category') }}:</span> {{ product.category }}</p>
                <p><span class="font-medium">{{ localeStore.t('productDetail.tags') }}:</span> {{ product.tags.join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Product Info -->
        <div class="sm:hidden border-t p-3 bg-gray-50">
          <div class="text-xs text-gray-600 space-y-1">
            <p><span class="font-medium">{{ localeStore.t('productDetail.category') }}:</span> {{ product?.category }}</p>
            <p><span class="font-medium">{{ localeStore.t('productDetail.tags') }}:</span> {{ product?.tags.join(', ') }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="!product" class="bg-white rounded-lg sm:shadow p-3 sm:p-6">
        <div class="animate-pulse space-y-4">
          <div class="h-6 sm:h-8 bg-gray-200 rounded w-1/3"></div>
          <div class="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-48 sm:h-64 bg-gray-200 rounded"></div>
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
import { useProductsStore } from '@/store/products'
import type { Product, ProductVariant } from '@/types'

const route = useRoute()
const cartStore = useCartStore()
const localeStore = useLocaleStore()
const productsStore = useProductsStore()

const product = ref<Product | null>(null)
const mainImage = ref<string>('')
const quantity = ref(1)
const selectedAttributes = ref<Record<string, string>>({})

const productId = computed(() => route.params.id as string)

const selectedVariant = computed((): ProductVariant | undefined => {
  if (!product.value?.variants) return undefined
  
  return product.value.variants.find(variant => {
    return Object.entries(selectedAttributes.value).every(([attr, value]) => 
      variant.attributes[attr] === value
    )
  })
})

const groupedVariants = computed(() => {
  if (!product.value?.variants) return {}
  
  const groups: Record<string, Set<string>> = {}
  
  product.value.variants.forEach(variant => {
    Object.entries(variant.attributes).forEach(([attr, value]) => {
      if (!groups[attr]) groups[attr] = new Set()
      groups[attr].add(String(value))
    })
  })
  
  return Object.fromEntries(
    Object.entries(groups).map(([attr, values]) => [attr, Array.from(values)])
  )
})

const selectVariantAttribute = (attribute: string, value: string) => {
  selectedAttributes.value[attribute] = value
}

const addToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart(product.value, quantity.value, selectedVariant.value)
  cartStore.openCart()
}

const loadProduct = async () => {
  // In a real app, this would fetch from an API
  // For now, we'll find it from the mock data
  await productsStore.fetchProducts()
  product.value = productsStore.products.find(p => p.id === productId.value) || null
  
  if (product.value && product.value.images.length > 0) {
    mainImage.value = product.value.images[0]
  }
}

onMounted(() => {
  loadProduct()
})
</script>
