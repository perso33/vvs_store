<template>
  <nav class="bg-white shadow-xl border-b border-purple-100 sticky top-0 z-50">
    <!-- Header Advertisement -->
    <AdManager placement="header" :max-ads="1" />
    
    <!-- Premium Top Bar - Hidden on mobile -->
    <div class="hidden sm:block bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-10 text-sm">
          <div class="flex items-center space-x-6">
            <span class="flex items-center space-x-1">
              <span>🌍</span>
              <span>Livraison premium mondiale</span>
            </span>
            <span class="flex items-center space-x-1">
              <span>💬</span>
              <span>Support VIP 24/7</span>
            </span>
            <span class="flex items-center space-x-1">
              <span>⚡</span>
              <span>Expédition express</span>
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Language Selector -->
            <select 
              :value="localeStore.currentLanguage" 
              @change="localeStore.setLanguage(($event.target as HTMLSelectElement).value as 'fr' | 'en' | 'ar')"
              class="bg-transparent text-white text-sm border-0 focus:outline-none cursor-pointer"
            >
              <option value="fr" class="text-gray-900">🇫🇷 Français</option>
              <option value="en" class="text-gray-900">🇺🇸 English</option>
              <option value="ar" class="text-gray-900">🇦 العربية</option>
            </select>
            
            <!-- Currency Selector -->
            <select 
              :value="localeStore.currentCurrency.code"
              @change="localeStore.setCurrency(localeStore.currencies.find(c => c.code === ($event.target as HTMLSelectElement).value)!)"
              class="bg-transparent text-white text-sm border-0 focus:outline-none cursor-pointer"
            >
              <option 
                v-for="currency in localeStore.currencies" 
                :key="currency.code" 
                :value="currency.code"
                class="text-gray-900"
              >
                {{ currency.code }} {{ currency.symbol }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 sm:space-x-3 group">
            <div class="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-200">
              <div class="text-white font-black text-sm sm:text-xl tracking-tight">VVS</div>
            </div>
            <div class="hidden sm:block">
              <div class="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                VVS Store
              </div>
              <div class="text-xs text-purple-600 font-semibold tracking-wide uppercase">Premium Marketplace</div>
            </div>
          </router-link>
        </div>

        <!-- Search Bar - Hidden on mobile, shown in menu -->
        <div class="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div class="w-full relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher des produits premium..."
              class="w-full pl-12 pr-16 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm text-gray-900 placeholder-gray-500"
            >
            <div class="absolute right-2 top-2">
              <button class="h-10 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Menu -->
        <div class="flex items-center space-x-1 sm:space-x-3">
          <!-- Cart Button -->
          <button
            @click="cartStore.toggleCart()"
            class="relative p-2 sm:p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.37A1 1 0 006.68 19h9.64a1 1 0 001.36-1.37L16 13M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-pulse">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Favorites Button - Hidden on mobile -->
          <button class="hidden sm:block p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <!-- User Menu Desktop -->
          <div v-if="!authStore.isAuthenticated" class="hidden lg:flex items-center space-x-3">
            <router-link
              to="/login"
              class="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              Se connecter
            </router-link>
            <router-link
              to="/register"
              class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              S'inscrire
            </router-link>
          </div>

          <!-- Authenticated User Desktop -->
          <div v-if="authStore.isAuthenticated" class="hidden lg:flex items-center space-x-4">
            <!-- User Avatar & Menu -->
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-2 text-gray-700 hover:text-purple-600 p-2 rounded-xl hover:bg-purple-50 transition-all duration-200"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-white text-sm font-semibold">
                    {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="font-medium">{{ authStore.user?.name }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
              >
                <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border-b border-gray-100">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold">
                        {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ authStore.user?.name }}</div>
                      <div class="text-sm text-gray-500">{{ authStore.user?.email }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="py-2">
                  <router-link
                    v-if="authStore.user?.role === 'super_admin'"
                    to="/admin/dashboard"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                  >
                    <span class="text-lg">🏢</span>
                    <span>Admin Dashboard</span>
                  </router-link>
                  <router-link
                    v-if="authStore.user?.role === 'store_admin'"
                    to="/vendor/dashboard"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                  >
                    <span class="text-lg">🏪</span>
                    <span>Mon Magasin</span>
                  </router-link>
                  <router-link
                    to="/profile"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                  >
                    <span class="text-lg">👤</span>
                    <span>Mon Profil</span>
                  </router-link>
                  <router-link
                    to="/orders"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                  >
                    <span class="text-lg">📦</span>
                    <span>Mes Commandes</span>
                  </router-link>
                  <hr class="my-2 border-gray-100">
                  <button
                    @click="logout"
                    class="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 sm:p-3 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
          >
            <svg v-if="!mobileMenuOpen" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Premium Category Menu - Hidden on mobile -->
    <div class="hidden lg:block bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t border-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-8 h-14 overflow-x-auto scrollbar-hide">
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">📱</span>
            <span>Tech & Électronique</span>
          </button>
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">👗</span>
            <span>Mode Premium</span>
          </button>
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">🏠</span>
            <span>Maison & Design</span>
          </button>
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">⚽</span>
            <span>Sports & Fitness</span>
          </button>
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">💎</span>
            <span>Bijoux & Luxe</span>
          </button>
          <button class="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-purple-600 whitespace-nowrap group transition-colors">
            <span class="text-lg group-hover:scale-110 transition-transform">🚗</span>
            <span>Auto & Moto</span>
          </button>
          <button class="text-purple-600 text-sm font-semibold hover:text-purple-700 whitespace-nowrap flex items-center space-x-1">
            <span>Voir tout</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu - Dropdown Style -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t z-40">
        <div class="max-h-screen overflow-y-auto">
          <!-- Mobile Search -->
          <div class="px-4 py-4 border-b bg-gray-50">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-sm"
              >
            </div>
          </div>

          <!-- Language & Currency Selectors -->
          <div class="px-4 py-3 border-b bg-gray-50">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Langue</label>
                <select 
                  :value="localeStore.currentLanguage" 
                  @change="localeStore.setLanguage(($event.target as HTMLSelectElement).value as 'fr' | 'en' | 'ar')"
                  class="w-full text-sm border border-gray-200 rounded-lg p-2 focus:border-purple-500 focus:outline-none"
                >
                  <option value="fr">🇫🇷 Français</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="ar">🇦 العربية</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Devise</label>
                <select 
                  :value="localeStore.currentCurrency.code"
                  @change="localeStore.setCurrency(localeStore.currencies.find(c => c.code === ($event.target as HTMLSelectElement).value)!)"
                  class="w-full text-sm border border-gray-200 rounded-lg p-2 focus:border-purple-500 focus:outline-none"
                >
                  <option 
                    v-for="currency in localeStore.currencies" 
                    :key="currency.code" 
                    :value="currency.code"
                  >
                    {{ currency.code }} {{ currency.symbol }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Categories Grid -->
          <div class="p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-sm">🏪 Catégories</h3>
            <div class="grid grid-cols-3 gap-3 mb-4">
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">📱</span>
                <span class="text-xs font-medium text-gray-700">Tech</span>
              </button>
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">👗</span>
                <span class="text-xs font-medium text-gray-700">Mode</span>
              </button>
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">🏠</span>
                <span class="text-xs font-medium text-gray-700">Maison</span>
              </button>
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">⚽</span>
                <span class="text-xs font-medium text-gray-700">Sport</span>
              </button>
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">🚗</span>
                <span class="text-xs font-medium text-gray-700">Auto</span>
              </button>
              <button class="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border">
                <span class="text-xl group-hover:scale-110 transition-transform mb-1">💎</span>
                <span class="text-xs font-medium text-gray-700">Luxe</span>
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="px-4 pb-4">
            <h4 class="font-semibold text-gray-700 text-sm mb-3">🔥 Actions rapides</h4>
            <div class="space-y-2">
              <button class="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:bg-gray-50 transition-all group border">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500">⚡</span>
                  <span class="text-sm font-medium text-gray-700">Offres Flash</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button class="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:bg-gray-50 transition-all group border">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500">💎</span>
                  <span class="text-sm font-medium text-gray-700">Nouveautés</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              <button class="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:bg-gray-50 transition-all group border">
                <div class="flex items-center space-x-3">
                  <span class="text-yellow-500">⭐</span>
                  <span class="text-sm font-medium text-gray-700">Meilleures ventes</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- User Section -->
          <div v-if="!authStore.isAuthenticated" class="px-4 py-4 border-t bg-gray-50">
            <div class="space-y-2">
              <router-link
                to="/login"
                @click="mobileMenuOpen = false"
                class="flex items-center justify-center w-full p-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                Se connecter
              </router-link>
              <router-link
                to="/register"
                @click="mobileMenuOpen = false"
                class="flex items-center justify-center w-full p-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                S'inscrire
              </router-link>
            </div>
          </div>
          
          <!-- Authenticated User Menu -->
          <div v-if="authStore.isAuthenticated" class="px-4 py-4 border-t bg-gray-50">
            <div class="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span class="text-white font-semibold text-sm">
                  {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 text-sm">{{ authStore.user?.name }}</div>
                <div class="text-xs text-gray-500">{{ authStore.user?.email }}</div>
              </div>
            </div>
            
            <div class="space-y-2">
              <router-link
                v-if="authStore.user?.role === 'super_admin'"
                to="/admin/dashboard"
                @click="mobileMenuOpen = false"
                class="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all"
              >
                <span class="text-lg">🏢</span>
                <span>Admin Dashboard</span>
              </router-link>
              <router-link
                v-if="authStore.user?.role === 'store_admin'"
                to="/vendor/dashboard"
                @click="mobileMenuOpen = false"
                class="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all"
              >
                <span class="text-lg">🏪</span>
                <span>Mon Magasin</span>
              </router-link>
              <router-link
                to="/profile"
                @click="mobileMenuOpen = false"
                class="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all"
              >
                <span class="text-lg">👤</span>
                <span>Mon Profil</span>
              </router-link>
              <router-link
                to="/orders"
                @click="mobileMenuOpen = false"
                class="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all"
              >
                <span class="text-lg">📦</span>
                <span>Mes Commandes</span>
              </router-link>
              <button
                @click="logout"
                class="flex items-center space-x-3 w-full p-3 text-sm text-red-600 bg-white rounded-lg hover:bg-red-50 transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"></path>
                </svg>
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Cart Sidebar -->
    <transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="cartStore.isOpen" class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
            <h2 class="text-lg font-bold text-gray-900">Mon Panier ({{ cartStore.itemCount }})</h2>
            <button
              @click="cartStore.toggleCart()"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="cartStore.items.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.37A1 1 0 006.68 19h9.64a1 1 0 001.36-1.37L16 13M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
              </svg>
              <p class="text-gray-500 mb-4">Votre panier est vide</p>
              <button
                @click="cartStore.toggleCart()"
                class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                Continuer mes achats
              </button>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id" class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-gray-900 truncate">{{ item.name }}</h3>
                    <p class="text-sm text-gray-500">{{ localeStore.formatPrice(item.price) }}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <button
                        @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                        class="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <span class="text-sm font-medium">{{ item.quantity }}</span>
                      <button
                        @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                        class="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    @click="cartStore.removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="cartStore.items.length > 0" class="border-t p-4 bg-gray-50">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-gray-900">Total:</span>
              <span class="text-xl font-black text-purple-600">{{ localeStore.formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <router-link
              to="/checkout"
              @click="cartStore.toggleCart()"
              class="block w-full text-center px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Procéder au paiement
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { useLocaleStore } from '@/store/locale'
import { useAdvertisementsStore } from '@/store/advertisements'
import AdManager from '@/components/Advertisement/AdManager.vue'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const localeStore = useLocaleStore()
const adsStore = useAdvertisementsStore()

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)

const logout = () => {
  authStore.logout()
  userMenuOpen.value = false
  mobileMenuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
