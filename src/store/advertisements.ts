import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Advertisement {
  id: string
  title: string
  description: string
  imageUrl: string
  targetUrl: string
  company: string
  type: 'banner' | 'card' | 'sidebar' | 'popup' | 'native'
  placement: 'header' | 'hero' | 'categories' | 'products' | 'footer' | 'sidebar' | 'between-products'
  isActive: boolean
  startDate: Date
  endDate: Date
  clickCount: number
  impressionCount: number
  budget?: number
  cpc?: number // Cost per click
  cpm?: number // Cost per mille (thousand impressions)
  targetAudience?: string[]
  categories?: string[]
}

export const useAdvertisementsStore = defineStore('advertisements', () => {
  const advertisements = ref<Advertisement[]>([])
  const visibleAds = ref<Set<string>>(new Set())
  const clickedAds = ref<Set<string>>(new Set())

  // Initialize with mock data
  const initializeMockAds = () => {
    advertisements.value = [
      {
        id: 'ad-1',
        title: 'Nouveau Samsung Galaxy S24',
        description: 'Découvrez le nouveau flagship Samsung avec 50% de réduction pour les premiers clients VVS !',
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=400&fit=crop&crop=center',
        targetUrl: '/products/samsung-galaxy-s24',
        company: 'Samsung Congo',
        type: 'banner',
        placement: 'hero',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 5000,
        cpc: 0.5,
        targetAudience: ['tech-enthusiasts', 'mobile-users'],
        categories: ['Electronics', 'Mobile']
      },
      {
        id: 'ad-2',
        title: 'Mode Congolaise Premium',
        description: 'Collection exclusive de vêtements traditionnels congolais modernisés par nos créateurs locaux.',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop&crop=center',
        targetUrl: '/stores/mode-congolaise',
        company: 'Atelier Kinshasa Fashion',
        type: 'card',
        placement: 'between-products',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 3000,
        cpc: 0.3,
        targetAudience: ['fashion-lovers', 'cultural-enthusiasts'],
        categories: ['Fashion', 'Cultural']
      },
      {
        id: 'ad-3',
        title: 'Livraison Express Lubumbashi',
        description: 'Commandez avant 15h et recevez vos produits le jour même à Lubumbashi !',
        imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=300&fit=crop&crop=center',
        targetUrl: '/delivery-info',
        company: 'VVS Logistics',
        type: 'banner',
        placement: 'header',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 2000,
        cpm: 5,
        targetAudience: ['local-customers'],
        categories: ['Logistics', 'Local']
      },
      {
        id: 'ad-4',
        title: 'Équipements Miniers Professionnels',
        description: 'Matériel de qualité industrielle pour l\'exploitation minière. Prix spéciaux pour les entreprises locales.',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-b0163b8a4983?w=800&h=400&fit=crop&crop=center',
        targetUrl: '/categories/mining-equipment',
        company: 'Congo Mining Solutions',
        type: 'native',
        placement: 'categories',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 10000,
        cpc: 2.0,
        targetAudience: ['mining-companies', 'industrial-buyers'],
        categories: ['Industrial', 'Mining']
      },
      {
        id: 'ad-5',
        title: 'Clinique Moderne Lubumbashi',
        description: 'Soins médicaux de qualité internationale. Consultations, chirurgie, dentisterie. Assurance acceptée.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&crop=center',
        targetUrl: '/health-services',
        company: 'Clinique Excellence',
        type: 'sidebar',
        placement: 'sidebar',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 4000,
        cpc: 1.0,
        targetAudience: ['health-conscious', 'families'],
        categories: ['Health', 'Services']
      },
      {
        id: 'ad-6',
        title: 'Formation Professionnelle IT',
        description: 'Devenez développeur en 6 mois ! Formations certifiantes en programmation, design et marketing digital.',
        imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop&crop=center',
        targetUrl: '/education/it-training',
        company: 'Congo Tech Academy',
        type: 'card',
        placement: 'footer',
        isActive: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        clickCount: 0,
        impressionCount: 0,
        budget: 6000,
        cpc: 0.8,
        targetAudience: ['students', 'career-changers', 'young-professionals'],
        categories: ['Education', 'Technology']
      }
    ]
  }

  // Get ads by placement
  const getAdsByPlacement = (placement: Advertisement['placement']) => {
    return computed(() => 
      advertisements.value.filter(ad => 
        ad.placement === placement && 
        ad.isActive && 
        new Date() >= ad.startDate && 
        new Date() <= ad.endDate
      )
    )
  }

  // Get ads by type
  const getAdsByType = (type: Advertisement['type']) => {
    return computed(() => 
      advertisements.value.filter(ad => 
        ad.type === type && 
        ad.isActive && 
        new Date() >= ad.startDate && 
        new Date() <= ad.endDate
      )
    )
  }

  // Track impression
  const trackImpression = (adId: string) => {
    const ad = advertisements.value.find(a => a.id === adId)
    if (ad && !visibleAds.value.has(adId)) {
      ad.impressionCount++
      visibleAds.value.add(adId)
      // In a real app, you'd send this to analytics
      console.log(`Impression tracked for ad: ${ad.title}`)
    }
  }

  // Track click
  const trackClick = (adId: string) => {
    const ad = advertisements.value.find(a => a.id === adId)
    if (ad) {
      ad.clickCount++
      clickedAds.value.add(adId)
      // In a real app, you'd send this to analytics
      console.log(`Click tracked for ad: ${ad.title}`)
    }
  }

  // Get random ad by placement
  const getRandomAdByPlacement = (placement: Advertisement['placement']) => {
    const placementAds = getAdsByPlacement(placement).value
    if (placementAds.length === 0) return null
    return placementAds[Math.floor(Math.random() * placementAds.length)]
  }

  // Get ads for specific categories
  const getAdsForCategories = (categories: string[]) => {
    return computed(() =>
      advertisements.value.filter(ad =>
        ad.isActive &&
        new Date() >= ad.startDate &&
        new Date() <= ad.endDate &&
        ad.categories?.some(cat => categories.includes(cat))
      )
    )
  }

  // Analytics computed properties
  const totalImpressions = computed(() => 
    advertisements.value.reduce((sum, ad) => sum + ad.impressionCount, 0)
  )

  const totalClicks = computed(() => 
    advertisements.value.reduce((sum, ad) => sum + ad.clickCount, 0)
  )

  const averageCTR = computed(() => {
    const clicks = totalClicks.value
    const impressions = totalImpressions.value
    return impressions > 0 ? (clicks / impressions) * 100 : 0
  })

  // Initialize mock data
  initializeMockAds()

  return {
    advertisements,
    visibleAds,
    clickedAds,
    getAdsByPlacement,
    getAdsByType,
    getRandomAdByPlacement,
    getAdsForCategories,
    trackImpression,
    trackClick,
    totalImpressions,
    totalClicks,
    averageCTR
  }
})
