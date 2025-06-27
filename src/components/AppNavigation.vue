<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const showMobileMenu = ref(false)

const navigationItems = computed(() => {
  const items = [
    { name: 'Accueil', to: '/', icon: null },
    { name: 'Produits', to: '/products', icon: ShoppingBagIcon },
  ]

  if (authStore.isAuthenticated) {
    if (authStore.isSuperAdmin) {
      items.push(
        { name: 'Admin', to: '/admin', icon: CogIcon },
        { name: 'Boutiques', to: '/admin/stores', icon: BuildingStorefrontIcon }
      )
    } else if (authStore.isStoreAdmin) {
      items.push(
        { name: 'Mon Espace', to: '/vendor', icon: CogIcon },
        { name: 'Mes Produits', to: '/vendor/products', icon: ShoppingBagIcon }
      )
    }
  }

  return items
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
  showMobileMenu.value = false
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Desktop Navigation -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">EC</span>
            </div>
            <span class="text-xl font-bold text-gray-900 hidden sm:block">E-Commerce</span>
          </RouterLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:space-x-8 md:ml-10">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
            >
              <component
                v-if="item.icon"
                :is="item.icon"
                class="w-4 h-4 inline-block mr-1"
              />
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <!-- Desktop User Menu -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center space-x-2 text-sm text-gray-700">
              <UserCircleIcon class="w-5 h-5" />
              <span>{{ authStore.user?.name }}</span>
            </div>
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <ArrowRightOnRectangleIcon class="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Connexion
            </RouterLink>
            <RouterLink
              to="/register"
              class="btn-primary"
            >
              Inscription
            </RouterLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
          >
            <Bars3Icon v-if="!showMobileMenu" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            @click="closeMobileMenu"
            class="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              class="w-5 h-5 inline-block mr-2"
            />
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Mobile User Menu -->
        <div class="pt-4 pb-3 border-t border-gray-200">
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center px-5 mb-3">
              <UserCircleIcon class="w-8 h-8 text-gray-400" />
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">{{ authStore.user?.name }}</div>
                <div class="text-sm text-gray-500">{{ authStore.user?.email }}</div>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="block w-full text-left px-5 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon class="w-5 h-5 inline-block mr-2" />
              Déconnexion
            </button>
          </template>
          <template v-else>
            <div class="space-y-1 px-2">
              <RouterLink
                to="/login"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Connexion
              </RouterLink>
              <RouterLink
                to="/register"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Inscription
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>
