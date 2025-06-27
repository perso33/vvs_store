<template>
  <div class="min-h-screen bg-gray-50" :dir="localeStore.isRTL ? 'rtl' : 'ltr'">
    <!-- Header Advertisement -->
    <AdManager placement="header" :max-ads="1" />

    <!-- Enhanced Hero Section VVS Style - Mobile Optimized -->
    <div class="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
        <div class="absolute top-0 left-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center" 
            alt="VVS Store Background" 
            class="w-full h-full object-cover opacity-30"
          />
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-4 lg:mb-6">
              <span class="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-xs sm:text-sm font-medium">{{ localeStore.t('hero.productsCount') }}</span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl lg:text-7xl font-black mb-4 lg:mb-6 leading-tight">
              <span class="block">{{ localeStore.t('hero.title') }}</span>
              <span class="block text-lg sm:text-xl lg:text-3xl font-normal text-purple-200 mt-2">
                {{ localeStore.t('hero.subtitle') }}
              </span>
            </h1>
            
            <p class="text-sm sm:text-lg lg:text-2xl mb-4 lg:mb-8 opacity-90 leading-relaxed px-4 sm:px-0">
              {{ localeStore.t('hero.description') }}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <button class="bg-white text-purple-600 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-sm lg:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {{ localeStore.t('hero.startShopping') }}
              </button>
              <button class="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-sm lg:text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                {{ localeStore.t('hero.becomeVendor') }}
              </button>
            </div>
          </div>
          
          <!-- Enhanced Right Side with Featured Categories - Mobile Optimized -->
          <div class="relative mt-6 lg:mt-0">
            <!-- Main Stats Card -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
              <div class="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <div class="bg-white/20 rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                  <div class="text-lg sm:text-xl lg:text-2xl font-bold">10M+</div>
                  <div class="text-xs lg:text-sm opacity-90">{{ localeStore.t('hero.stats.products') }}</div>
                </div>
                <div class="bg-white/20 rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                  <div class="text-lg sm:text-xl lg:text-2xl font-bold">200K+</div>
                  <div class="text-xs lg:text-sm opacity-90">{{ localeStore.t('hero.stats.vendors') }}</div>
                </div>
                <div class="bg-white/20 rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                  <div class="text-lg sm:text-xl lg:text-2xl font-bold">190</div>
                  <div class="text-xs lg:text-sm opacity-90">{{ localeStore.t('hero.stats.countries') }}</div>
                </div>
                <div class="bg-white/20 rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                  <div class="text-lg sm:text-xl lg:text-2xl font-bold">24/7</div>
                  <div class="text-xs lg:text-sm opacity-90">{{ localeStore.t('hero.stats.support') }}</div>
                </div>
              </div>
            </div>
            
            <!-- Featured Categories Grid -->
            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              <div 
                v-for="category in featuredCategories.slice(0, 6)" 
                :key="category.id"
                @click="filterByCategory(category.name)"
                class="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 hover:bg-white/25 transition-all duration-300 cursor-pointer group"
              >
                <div class="aspect-square rounded-lg overflow-hidden mb-1 sm:mb-2">
                  <img 
                    :src="category.image" 
                    :alt="category.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div class="text-xs font-semibold text-center opacity-90">
                  {{ localeStore.t(`categories.${category.key}`) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Advertisement Banner -->
    <AdManager placement="hero" :max-ads="1" />

    <!-- Promotional Slider - Mobile Optimized -->
    <div class="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 py-3 sm:py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center space-x-4 sm:space-x-8 overflow-x-auto">
          <div class="flex items-center space-x-2 sm:space-x-3 text-white font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap animate-pulse">
            <span class="text-lg sm:text-2xl">🔥</span>
            <span>{{ localeStore.t('promo.flashSale') }}</span>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-3 text-white font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap">
            <span class="text-lg sm:text-2xl">⚡</span>
            <span>{{ localeStore.t('promo.freeShipping') }}</span>
          </div>
          <div class="hidden sm:flex items-center space-x-3 text-white font-bold text-sm lg:text-base whitespace-nowrap">
            <span class="text-2xl">💎</span>
            <span>{{ localeStore.t('promo.newVendors') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Promotional Products Slider -->
    <div class="bg-white py-8 lg:py-12 border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
              {{ localeStore.t('promo.title') }}
            </h2>
            <p class="text-gray-600 mt-1">{{ localeStore.t('promo.subtitle') }}</p>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="scrollPromoLeft"
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button 
              @click="scrollPromoRight"
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="relative overflow-hidden">
          <div 
            ref="promoSlider"
            class="flex space-x-4 transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${promoSlideOffset}px)` }"
          >
            <div 
              v-for="product in promotionalProducts" 
              :key="`promo-${product.id}`"
              class="flex-none w-64 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-red-100"
            >
              <div class="h-40 relative overflow-hidden">
                <div class="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 animate-pulse">
                  -{{ Math.floor(Math.random() * 50 + 30) }}%
                </div>
                <div class="absolute top-2 right-2 bg-yellow-400 text-red-600 px-2 py-1 rounded-full text-xs font-bold z-10">
                  🔥 HOT
                </div>
                <img 
                  :src="getProductImage(product.category, product.name)"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2 text-sm line-clamp-2">
                  {{ product.name }}
                </h3>
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <div class="text-lg font-black text-red-600">{{ localeStore.formatPrice(product.price * 0.7) }}</div>
                    <div class="text-xs text-gray-400 line-through">{{ localeStore.formatPrice(product.price) }}</div>
                  </div>
                  <div class="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full font-semibold">
                    📦 {{ Math.floor(Math.random() * 50 + 5) }} {{ localeStore.t('promo.remaining') }}
                  </div>
                </div>
                <button 
                  @click="addToCart({ ...product, price: product.price * 0.7 })"
                  class="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 text-sm"
                >
                  {{ localeStore.t('promo.buyNow') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Section - Mobile Optimized -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row gap-3 lg:gap-4">
            <div class="flex-1 relative">
              <input
                type="text"
                placeholder="Rechercher des produits, marques, magasins..."
                class="w-full px-4 lg:px-6 py-3 lg:py-4 border-2 border-gray-200 rounded-lg text-sm lg:text-lg focus:border-purple-500 focus:outline-none"
              >
              <div class="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold text-sm lg:text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section - Mobile Optimized -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">{{ localeStore.t('categories.title') }}</h2>
      
      <!-- Category Native Ads -->
      <AdManager placement="categories" :max-ads="2" :categories="['Electronics', 'Fashion', 'Industrial']" />
      
      <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        <div v-for="category in categories" :key="category.id" 
             @click="filterByCategory(category.name)"
             :class="[
               selectedCategory === category.name ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg scale-105' : 'bg-white hover:shadow-lg',
               'rounded-xl p-3 sm:p-4 md:p-6 text-center transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border group'
             ]">
          <div class="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 overflow-hidden rounded-full">
            <img 
              :src="getCategoryImage(category.name)"
              :alt="category.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <h3 class="font-semibold mb-1 text-xs sm:text-sm md:text-base"
              :class="selectedCategory === category.name ? 'text-purple-700' : 'text-gray-900'">
            {{ category.name }}
          </h3>
          <p class="text-xs sm:text-xs md:text-sm"
             :class="selectedCategory === category.name ? 'text-purple-600' : 'text-gray-500'">
            {{ getCategoryProductCount(category.name) }} produits
          </p>
        </div>
      </div>
      
      <!-- Clear Category Filter Button -->
      <div v-if="selectedCategory" class="text-center mt-4 sm:mt-6">
        <button 
          @click="clearCategoryFilter"
          class="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Effacer le filtre "{{ selectedCategory }}"</span>
        </button>
      </div>
    </div>

    <!-- Products Section VVS Premium - Mobile Optimized -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {{ localeStore.t('products.title') }}
          </h2>
          <p class="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">{{ localeStore.t('products.subtitle') }}</p>
        </div>
        <div class="flex space-x-1 sm:space-x-2 lg:space-x-4 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
          <button 
            @click="filterProducts('new')"
            :class="activeFilter === 'new' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'"
            class="px-3 sm:px-4 lg:px-6 py-2 rounded-xl font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0"
          >
            {{ localeStore.t('products.new') }}
          </button>
          <button 
            @click="filterProducts('bestseller')"
            :class="activeFilter === 'bestseller' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'"
            class="px-3 sm:px-4 lg:px-6 py-2 rounded-xl font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0"
          >
            {{ localeStore.t('products.bestseller') }}
          </button>
          <button 
            @click="filterProducts('promotion')"
            :class="activeFilter === 'promotion' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'"
            class="px-3 sm:px-4 lg:px-6 py-2 rounded-xl font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap transition-all flex-shrink-0"
          >
            {{ localeStore.t('products.promotion') }}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
        <div 
          v-for="(product, index) in products" 
          :key="product.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
        >
          <!-- Inject ad every 4 products -->
          <div v-if="index === 3" class="col-span-2 mb-4">
            <AdNative :ad="getRandomNativeAd()" variant="product" />
          </div>
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
            <div class="h-36 lg:h-48 relative overflow-hidden">
              <!-- Conditional promotion badge - only show on some products -->
              <div 
                v-if="isProductOnPromotion(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                -{{ getDiscountPercentage(product) }}%
              </div>
              <!-- New/Bestseller badges for non-promotional products -->
              <div 
                v-else-if="isNewProduct(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                NOUVEAU
              </div>
              <div 
                v-else-if="isBestsellerProduct(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                TOP VENTE
              </div>
              <div class="absolute top-3 right-3 z-10">
                <button class="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all group/heart">
                  <svg class="w-4 h-4 group-hover/heart:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
              <img 
                :src="getProductImage(product.category, product.name)"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="p-4 lg:p-6">
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {{ product.category }}
                </span>
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-xs text-gray-500">4.{{ Math.floor(Math.random() * 9 + 1) }}</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                {{ product.description || 'Produit premium de qualité exceptionnelle' }}
              </p>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="text-xl font-black text-purple-600">
                    {{ isProductOnPromotion(product) ? localeStore.formatPrice(getPromotionalPrice(product)) : localeStore.formatPrice(product.price) }}
                  </div>
                  <div 
                    v-if="isProductOnPromotion(product)" 
                    class="text-sm text-gray-400 line-through"
                  >
                    {{ localeStore.formatPrice(product.price) }}
                  </div>
                </div>
                <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  📦 {{ product.stock }} {{ localeStore.t('products.inStock') }}
                </div>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="addToCart(product)"
                  class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.37A1 1 0 006.68 19h9.64a1 1 0 001.36-1.37L16 13M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  </svg>
                  <span>{{ localeStore.t('products.addToCart') }}</span>
                </button>
                <router-link 
                  :to="`/products/${product.id}`"
                  class="px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center group/view"
                >
                  <svg class="w-4 h-4 group-hover/view:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diverse Products Section -->
    <div class="bg-gray-100 py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 lg:mb-12">
          <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            🌟 Découvrez Notre Sélection Complète
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Des produits à prix réguliers aux offres exceptionnelles - trouvez exactement ce que vous cherchez
          </p>
        </div>

        <!-- Mixed Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="product in allProducts.slice(0, 12)" 
            :key="`mixed-${product.id}`"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div class="h-48 relative overflow-hidden">
              <!-- Dynamic badges based on product type -->
              <div 
                v-if="isProductOnPromotion(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 animate-pulse"
              >
                🔥 -{{ getDiscountPercentage(product) }}%
              </div>
              <div 
                v-else-if="isNewProduct(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                ✨ {{ localeStore.currentLanguage === 'ar' ? 'جديد' : 'NOUVEAU' }}
              </div>
              <div 
                v-else-if="isBestsellerProduct(product)" 
                class="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                ⭐ {{ localeStore.currentLanguage === 'ar' ? 'الأكثر مبيعاً' : 'TOP' }}
              </div>
              <div 
                v-else
                class="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
              >
                💎 PREMIUM
              </div>

              <div class="absolute top-3 right-3 z-10">
                <button class="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all group/heart">
                  <svg class="w-4 h-4 group-hover/heart:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>

              <img 
                :src="getProductImage(product.category, product.name)"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div class="p-3 lg:p-5">
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {{ product.category }}
                </span>
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-xs text-gray-500">4.{{ Math.floor(Math.random() * 9 + 1) }}</span>
                </div>
              </div>

              <h3 class="text-sm lg:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {{ product.name }}
              </h3>

              <div class="flex items-center justify-between mb-3">
                <div>
                  <div class="text-lg lg:text-xl font-black text-purple-600">
                    {{ isProductOnPromotion(product) ? localeStore.formatPrice(getPromotionalPrice(product)) : localeStore.formatPrice(product.price) }}
                  </div>
                  <div 
                    v-if="isProductOnPromotion(product)" 
                    class="text-xs lg:text-sm text-gray-400 line-through"
                  >
                    {{ localeStore.formatPrice(product.price) }}
                  </div>
                </div>
                <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  📦 {{ product.stock }}
                </div>
              </div>

              <button 
                @click="addToCart(product)"
                class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 lg:py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.37A1 1 0 006.68 19h9.64a1 1 0 001.36-1.37L16 13M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                </svg>
                <span>{{ localeStore.t('products.addToCart') }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-8 lg:mt-12">
          <button class="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 shadow-lg">
            🔍 Voir plus de produits
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section VVS Premium -->
    <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12 lg:py-16 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
          <span class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
          <span class="text-sm font-medium">Rejoignez la communauté VVS Premium</span>
        </div>
        
        <h2 class="text-3xl lg:text-5xl font-black mb-4 lg:mb-6">
          Prêt à développer votre 
          <span class="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            business premium ?
          </span>
        </h2>
        
        <p class="text-lg lg:text-xl mb-6 lg:mb-8 opacity-90 max-w-3xl mx-auto">
          Rejoignez des millions d'entrepreneurs qui font confiance à VVS Store pour développer leur activité
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-md sm:max-w-none mx-auto mb-8">
          <router-link
            to="/register"
            class="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-black text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>🚀</span>
            <span>Créer un compte vendeur</span>
          </router-link>
          <button class="border-2 border-white text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-bold text-base lg:text-lg hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center justify-center space-x-2">
            <span>💡</span>
            <span>En savoir plus</span>
          </button>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mt-12">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
            <div class="text-4xl mb-4">💎</div>
            <h3 class="text-xl font-bold mb-2">Marketplace Premium</h3>
            <p class="text-sm opacity-90">Accédez à des millions d'acheteurs qualifiés dans le monde entier</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-bold mb-2">Outils avancés</h3>
            <p class="text-sm opacity-90">Gérez votre boutique avec nos outils professionnels de dernière génération</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-xl font-bold mb-2">Support VIP</h3>
            <p class="text-sm opacity-90">Bénéficiez d'un support client premium 24/7 et d'un accompagnement personnalisé</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Advertisement Section -->
    <div class="bg-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdManager placement="footer" :max-ads="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProductsStore } from '@/store/products'
import { useCartStore } from '@/store/cart'
import { useNotificationsStore } from '@/store/notifications'
import { useLocaleStore } from '@/store/locale'
import { useAdvertisementsStore } from '@/store/advertisements'
import type { Product } from '@/types'
import AdManager from '@/components/Advertisement/AdManager.vue'
import AdNative from '@/components/Advertisement/AdNative.vue'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const notifications = useNotificationsStore()
const localeStore = useLocaleStore()
const adsStore = useAdvertisementsStore()

// Get random native ad for product insertion
const getRandomNativeAd = () => {
  return adsStore.getRandomAdByPlacement('between-products')
}

const categories = ref([
  { id: '1', name: 'Electronics', icon: '⚡', count: '2.5M' },
  { id: '2', name: 'Smartphones', icon: '�', count: '1.8M' },
  { id: '3', name: 'Computers', icon: '💻', count: '1.2M' },
  { id: '4', name: 'Sports', icon: '⚽', count: '890K' },
  { id: '5', name: 'Vehicles', icon: '�', count: '750K' },
  { id: '6', name: 'Fashion', icon: '�', count: '620K' },
])

// Featured categories for hero section
const featuredCategories = ref([
  { 
    id: '1', 
    name: 'Electronics', 
    key: 'electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&h=200&fit=crop&crop=center' 
  },
  { 
    id: '2', 
    name: 'Smartphones', 
    key: 'smartphones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop&crop=center' 
  },
  { 
    id: '3', 
    name: 'Computers', 
    key: 'computers',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&crop=center' 
  },
  { 
    id: '4', 
    name: 'Sports', 
    key: 'sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center' 
  },
  { 
    id: '5', 
    name: 'Vehicles', 
    key: 'vehicles',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=200&fit=crop&crop=center' 
  },
  { 
    id: '6', 
    name: 'Fashion', 
    key: 'fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center' 
  }
])

const allProducts = ref<Product[]>([])
const activeFilter = ref<string>('new')
const selectedCategory = ref<string>('')

// Variables pour le slider de promotions
const promoSlider = ref<HTMLElement>()
const promoSlideOffset = ref(0)
const promoSlideWidth = 272 // 256px (w-64) + 16px (gap)

// Produits en promotion pour le slider
const promotionalProducts = computed(() => {
  return allProducts.value.slice(0, 12) // 12 produits en promotion
})

// Produits filtrés selon le type sélectionné et la catégorie
const products = computed(() => {
  let filteredProducts = allProducts.value

  // Filtrer par catégorie si une catégorie est sélectionnée
  if (selectedCategory.value) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory.value)
  }

  // Filtrer par type (nouveau, bestseller, promotion)
  switch (activeFilter.value) {
    case 'new':
      return filteredProducts.filter(isNewProduct).slice(0, 8)
    case 'bestseller':
      return filteredProducts.filter(isBestsellerProduct).slice(0, 8)
    case 'promotion':
      return filteredProducts.filter(isProductOnPromotion).slice(0, 8)
    default:
      return filteredProducts.slice(0, 8)
  }
})

// Product promotion logic
const isProductOnPromotion = (product: Product): boolean => {
  // Simpler logic: every 3rd product is on promotion
  return parseInt(product.id) % 3 === 0
}

const isNewProduct = (product: Product): boolean => {
  // Products with IDs ending in 1 or 2 are new
  return parseInt(product.id) % 10 === 1 || parseInt(product.id) % 10 === 2
}

const isBestsellerProduct = (product: Product): boolean => {
  // Products with IDs ending in 4 or 5 are bestsellers
  return parseInt(product.id) % 10 === 4 || parseInt(product.id) % 10 === 5
}

const getDiscountPercentage = (product: Product): number => {
  // Random discount between 15% and 60%
  const hash = product.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return Math.floor((hash % 46) + 15)
}

const getPromotionalPrice = (product: Product): number => {
  const discount = getDiscountPercentage(product)
  return product.price * (1 - discount / 100)
}

// Fonction pour filtrer les produits
const filterProducts = (filter: string) => {
  activeFilter.value = filter
}

// Fonctions pour gérer le filtrage par catégorie
const filterByCategory = (categoryName: string) => {
  selectedCategory.value = categoryName
  // Reset le filtre de type pour montrer tous les produits de la catégorie
  activeFilter.value = 'new'
}

const clearCategoryFilter = () => {
  selectedCategory.value = ''
}

const getCategoryProductCount = (categoryName: string): number => {
  return allProducts.value.filter(product => product.category === categoryName).length
}

// Fonctions pour le slider de promotions
const scrollPromoLeft = () => {
  const maxOffset = 0
  promoSlideOffset.value = Math.max(promoSlideOffset.value - promoSlideWidth * 2, maxOffset)
}

const scrollPromoRight = () => {
  const maxOffset = (promotionalProducts.value.length - 4) * promoSlideWidth
  promoSlideOffset.value = Math.min(promoSlideOffset.value + promoSlideWidth * 2, maxOffset)
}

// Fonction pour ajouter au panier
const addToCart = (product: Product) => {
  // Use promotional price if product is on promotion
  const finalProduct = isProductOnPromotion(product) 
    ? { ...product, price: getPromotionalPrice(product) }
    : product
    
  cartStore.addToCart(finalProduct, 1)
  notifications.addNotification({
    type: 'success',
    title: localeStore.t('common.cart'),
    message: `${product.name} a été ajouté à votre panier`,
    duration: 3000
  })
}

const getCategoryImage = (categoryName: string) => {
  const imageMap: Record<string, string> = {
    'Electronics': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=300&fit=crop&crop=center',
    'Smartphones': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center',
    'Computers': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center',
    'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center',
    'Vehicles': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=300&fit=crop&crop=center',
    'Fashion': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center'
  }
  return imageMap[categoryName] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center'
}

const getProductImage = (category: string, productName: string) => {
  const categoryImages: Record<string, string[]> = {
    'Electronics': [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop'
    ],
    'Smartphones': [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551212850-1b2e8e27c15b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop'
    ],
    'Computers': [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop'
    ],
    'Sports': [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516357231954-91487b459602?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    ],
    'Vehicles': [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=400&h=300&fit=crop'
    ],
    'Fashion': [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop'
    ]
  }
  
  const images = categoryImages[category] || categoryImages['Electronics']
  const hash = productName.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return images[hash % images.length]
}

onMounted(async () => {
  await productsStore.fetchProducts()
  allProducts.value = productsStore.products
})
</script>
