<template>
  <!-- Card Advertisement Component -->
  <div
    v-if="ad"
    class="w-full bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer group"
    @click="handleClick"
    @vue:mounted="trackImpression"
  >
    <!-- Ad Label -->
    <div class="relative">
      <div class="absolute top-3 left-3 z-10">
        <span class="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          SPONSORISÉ
        </span>
      </div>
      <div class="absolute top-3 right-3 z-10">
        <div class="bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
          {{ ad.company }}
        </div>
      </div>
    </div>

    <!-- Image -->
    <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
      <img
        :src="ad.imageUrl"
        :alt="ad.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-6">
      <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
        {{ ad.title }}
      </h3>
      <p class="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {{ ad.description }}
      </p>
      
      <!-- Call to Action -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-500">Publicité</span>
        </div>
        <button class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
          Découvrir
        </button>
      </div>

      <!-- Performance Indicators (for demo) -->
      <div v-if="showStats" class="mt-4 pt-4 border-t border-gray-100">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>{{ ad.impressionCount }} vues</span>
          <span>{{ ad.clickCount }} clics</span>
          <span v-if="ad.impressionCount > 0">{{ ((ad.clickCount / ad.impressionCount) * 100).toFixed(1) }}% CTR</span>
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
  showStats?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showStats: false
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
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
