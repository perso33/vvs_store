<template>
  <!-- Banner Advertisement Component -->
  <div
    v-if="ad"
    class="w-full overflow-hidden cursor-pointer group"
    :class="bannerClasses"
    @click="handleClick"
    @vue:mounted="trackImpression"
  >
    <!-- Header Banner Style -->
    <div v-if="ad.placement === 'header'" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 sm:space-x-4">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm sm:text-base font-semibold truncate">{{ ad.title }}</p>
              <p class="text-xs sm:text-sm opacity-90 truncate">{{ ad.description }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-3">
            <button class="hidden sm:inline-flex bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
              En savoir plus
            </button>
            <button
              @click.stop="$emit('close')"
              class="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Banner Style -->
    <div v-else-if="ad.placement === 'hero'" class="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white rounded-2xl overflow-hidden shadow-2xl">
      <div class="absolute inset-0">
        <img
          :src="ad.imageUrl"
          :alt="ad.title"
          class="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      </div>
      <div class="relative p-6 sm:p-8 lg:p-12">
        <div class="flex items-center space-x-2 mb-4">
          <span class="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">SPONSORISÉ</span>
          <span class="text-xs opacity-75">{{ ad.company }}</span>
        </div>
        <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 leading-tight">{{ ad.title }}</h3>
        <p class="text-sm sm:text-lg opacity-90 mb-6 max-w-2xl leading-relaxed">{{ ad.description }}</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button class="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
            Découvrir maintenant
          </button>
          <button class="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300">
            Plus d'infos
          </button>
        </div>
      </div>
    </div>

    <!-- Regular Banner Style -->
    <div v-else class="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
          <img
            :src="ad.imageUrl"
            :alt="ad.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="flex-1 p-4 sm:p-6">
          <div class="flex items-start justify-between">
            <div class="min-w-0 flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Pub</span>
                <span class="text-xs text-gray-500">{{ ad.company }}</span>
              </div>
              <h3 class="text-sm sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ ad.title }}</h3>
              <p class="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">{{ ad.description }}</p>
              <button class="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                En savoir plus
                <svg class="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Advertisement } from '@/store/advertisements'
import { useAdvertisementsStore } from '@/store/advertisements'

interface Props {
  ad: Advertisement | null
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

const emit = defineEmits<{
  close: []
}>()

const adsStore = useAdvertisementsStore()

const bannerClasses = computed(() => {
  return {
    'transform transition-all duration-300 hover:scale-[1.02]': props.ad?.placement !== 'header',
    'text-xs': props.compact,
    'text-sm': !props.compact
  }
})

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
</style>
