<template>
  <!-- Native Advertisement Component (looks like regular content) -->
  <div
    v-if="ad"
    class="w-full cursor-pointer"
    @click="handleClick"
    @vue:mounted="trackImpression"
  >
    <!-- As Product Card -->
    <div v-if="variant === 'product'" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border">
      <div class="relative">
        <!-- Native Ad Badge -->
        <div class="absolute top-2 left-2 z-10">
          <span class="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sponsorisé
          </span>
        </div>
        
        <div class="h-48 sm:h-56 overflow-hidden">
          <img
            :src="ad.imageUrl"
            :alt="ad.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      <div class="p-4">
        <h3 class="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
          {{ ad.title }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
          {{ ad.description }}
        </p>
        
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-500">
            Par {{ ad.company }}
          </div>
          <button class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
            Voir plus
          </button>
        </div>
      </div>
    </div>

    <!-- As Category Card -->
    <div v-else-if="variant === 'category'" class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-purple-100">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sponsorisé
          </span>
          <span class="text-xs text-gray-500">{{ ad.company }}</span>
        </div>
        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img
            :src="ad.imageUrl"
            :alt="ad.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-gray-900 mb-1 line-clamp-1">{{ ad.title }}</h3>
          <p class="text-sm text-gray-600 line-clamp-2">{{ ad.description }}</p>
        </div>
      </div>
    </div>

    <!-- As Article/News -->
    <div v-else-if="variant === 'article'" class="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 group">
      <div class="p-4 sm:p-6">
        <div class="flex items-start space-x-4">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="ad.imageUrl"
              :alt="ad.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                Contenu sponsorisé
              </span>
              <span class="text-xs text-gray-500">{{ ad.company }}</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {{ ad.title }}
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ ad.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- As Inline Banner -->
    <div v-else class="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-xl p-4 sm:p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
      <div class="flex items-center justify-between mb-3">
        <span class="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Publicité
        </span>
        <span class="text-xs text-gray-600">{{ ad.company }}</span>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
          <img
            :src="ad.imageUrl"
            :alt="ad.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-1">{{ ad.title }}</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ ad.description }}</p>
          <button class="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors shadow-sm">
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { Advertisement } from '@/store/advertisements'
import { useAdvertisementsStore } from '@/store/advertisements'

interface Props {
  ad: Advertisement | null
  variant?: 'product' | 'category' | 'article' | 'inline'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'product'
})

const adsStore = useAdvertisementsStore()

const handleClick = () => {
  if (props.ad) {
    adsStore.trackClick(props.ad.id)
    
    // In a real app, you'd handle navigation here
    if (props.ad.targetUrl.startsWith('http')) {
      window.open(props.ad.targetUrl, '_blank', 'noopener,noreferrer')
    } else {
      // Use router for internal links
      console.log('Navigate to:', props.ad.targetUrl)
    }
  }
}

const trackImpression = () => {
  if (props.ad) {
    adsStore.trackImpression(props.ad.id)
  }
}

onMounted(() => {
  trackImpression()
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>
