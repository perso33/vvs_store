<template>
  <!-- Sidebar Advertisement Component -->
  <div
    v-if="ad"
    class="w-full bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer group sticky top-4"
    @click="handleClick"
    @vue:mounted="trackImpression"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold">PUBLICITÉ</span>
        <span class="text-xs opacity-75">{{ ad.company }}</span>
      </div>
    </div>

    <!-- Image -->
    <div class="relative h-32 sm:h-40 overflow-hidden">
      <img
        :src="ad.imageUrl"
        :alt="ad.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-bold text-gray-900 mb-2 text-sm line-clamp-2 leading-tight">
        {{ ad.title }}
      </h3>
      <p class="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {{ ad.description }}
      </p>
      
      <!-- Call to Action -->
      <button class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
        Découvrir
      </button>
    </div>

    <!-- Small Ads Variant -->
    <div v-if="compact" class="p-3 border-t bg-gray-50">
      <div class="text-center">
        <div class="text-xs text-gray-500 mb-2">Plus de {{ ad.company }}</div>
        <button class="text-xs text-purple-600 hover:text-purple-700 font-medium">
          Voir tous les produits →
        </button>
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
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
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
