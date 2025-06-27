<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useAdvertisementsStore } from '@/store/advertisements'
import AppNotifications from '@/components/AppNotifications.vue'
import AlibabaNavigation from '@/components/AlibabaNavigation.vue'
import Cart from '@/components/Cart.vue'
import CartNotification from '@/components/CartNotification.vue'
import AdSidebar from '@/components/Advertisement/AdSidebar.vue'

const authStore = useAuthStore()
const adsStore = useAdvertisementsStore()

// Get sidebar ads
const sidebarAds = computed(() => 
  adsStore.getAdsByPlacement('sidebar').value.slice(0, 2)
)

onMounted(() => {
  // Initialize authentication on app start
  authStore.initializeAuth()
})
</script>

<template>
  <div id="app" class="min-h-screen min-h-dvh bg-gray-50 flex flex-col">
    <!-- Navigation with integrated ads -->
    <AlibabaNavigation />
    
    <!-- Sidebar Advertisements -->
    <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div class="w-80 space-y-4">
        <AdSidebar
          v-for="ad in sidebarAds"
          :key="ad.id"
          :ad="ad"
          :compact="true"
        />
      </div>
    </div>
    
    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>
    
    <!-- Global Notifications -->
    <AppNotifications />
    
    <!-- Shopping Cart -->
    <Cart />
    
    <!-- Cart Notification -->
    <CartNotification />
  </div>
</template>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
