<template>
  <!-- Advertisement Manager Component -->
  <div class="advertisement-container">
    <!-- Header Ad -->
    <div v-if="headerAd && showHeaderAd" class="mb-4">
      <AdBanner :ad="headerAd" @close="hideHeaderAd" />
    </div>

    <!-- Hero Ad (for home page) -->
    <div v-if="heroAd && placement === 'hero'" class="mb-8">
      <AdBanner :ad="heroAd" />
    </div>

    <!-- Native ads between products -->
    <template v-if="placement === 'products' && nativeAds.length > 0">
      <div
        v-for="(ad, index) in nativeAds"
        :key="ad.id"
        class="mb-6"
      >
        <AdNative :ad="ad" :variant="getNativeVariant(index)" />
      </div>
    </template>

    <!-- Category ads -->
    <div v-if="placement === 'categories' && categoryAds.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <AdNative
        v-for="ad in categoryAds"
        :key="ad.id"
        :ad="ad"
        variant="category"
      />
    </div>

    <!-- Card ads -->
    <div v-if="placement === 'cards' && cardAds.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <AdCard
        v-for="ad in cardAds"
        :key="ad.id"
        :ad="ad"
        :show-stats="showStats"
      />
    </div>

    <!-- Sidebar ads -->
    <div v-if="placement === 'sidebar' && sidebarAds.length > 0" class="space-y-4">
      <AdSidebar
        v-for="ad in sidebarAds"
        :key="ad.id"
        :ad="ad"
        :compact="compact"
      />
    </div>

    <!-- Footer ads -->
    <div v-if="placement === 'footer' && footerAds.length > 0" class="mt-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdCard
          v-for="ad in footerAds"
          :key="ad.id"
          :ad="ad"
        />
      </div>
    </div>

    <!-- Floating/Popup ads (if needed) -->
    <Teleport to="body" v-if="popupAd && showPopup">
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div class="relative max-w-lg w-full">
          <button
            @click="closePopup"
            class="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-lg z-10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <AdCard :ad="popupAd" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAdvertisementsStore } from '@/store/advertisements'
import AdBanner from './AdBanner.vue'
import AdCard from './AdCard.vue'
import AdNative from './AdNative.vue'
import AdSidebar from './AdSidebar.vue'

interface Props {
  placement: 'header' | 'hero' | 'categories' | 'products' | 'sidebar' | 'footer' | 'cards'
  maxAds?: number
  categories?: string[]
  showStats?: boolean
  compact?: boolean
  enablePopup?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxAds: 3,
  categories: () => [],
  showStats: false,
  compact: false,
  enablePopup: false
})

const adsStore = useAdvertisementsStore()

// Local state
const showHeaderAd = ref(true)
const showPopup = ref(false)
const popupShown = ref(false)

// Computed ads by placement
const headerAd = computed(() => adsStore.getRandomAdByPlacement('header'))
const heroAd = computed(() => adsStore.getRandomAdByPlacement('hero'))
const categoryAds = computed(() => {
  const ads = adsStore.getAdsByPlacement('categories').value
  return ads.slice(0, props.maxAds)
})
const cardAds = computed(() => {
  const ads = adsStore.getAdsByType('card').value
  return ads.slice(0, props.maxAds)
})
const sidebarAds = computed(() => {
  const ads = adsStore.getAdsByPlacement('sidebar').value
  return ads.slice(0, props.maxAds)
})
const footerAds = computed(() => {
  const ads = adsStore.getAdsByPlacement('footer').value
  return ads.slice(0, props.maxAds)
})
const nativeAds = computed(() => {
  const ads = adsStore.getAdsByType('native').value
  if (props.categories.length > 0) {
    return adsStore.getAdsForCategories(props.categories).value
      .filter(ad => ad.type === 'native')
      .slice(0, props.maxAds)
  }
  return ads.slice(0, props.maxAds)
})

const popupAd = computed(() => adsStore.getAdsByType('popup').value[0] || null)

// Methods
const hideHeaderAd = () => {
  showHeaderAd.value = false
}

const closePopup = () => {
  showPopup.value = false
}

const getNativeVariant = (index: number) => {
  const variants = ['product', 'category', 'article', 'inline']
  return variants[index % variants.length] as 'product' | 'category' | 'article' | 'inline'
}

// Popup logic
const showPopupAfterDelay = () => {
  if (props.enablePopup && popupAd.value && !popupShown.value) {
    setTimeout(() => {
      showPopup.value = true
      popupShown.value = true
    }, 10000) // Show after 10 seconds
  }
}

onMounted(() => {
  showPopupAfterDelay()
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
/* Advertisement container styles */
</style>
