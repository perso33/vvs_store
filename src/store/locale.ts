import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Translation {
  [key: string]: string | Translation
}

export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number
}

const translations = {
  fr: {
    hero: {
      title: 'VVS Store',
      subtitle: 'Premium Marketplace - RDC',
      description: '🇨🇩 Découvrez des produits exceptionnels depuis la RDC',
      startShopping: '🛍️ Commencer mes achats',
      becomeVendor: '🏪 Devenir vendeur',
      productsCount: 'Plus de 10M de produits disponibles',
      stats: {
        products: 'Produits',
        vendors: 'Vendeurs',
        countries: 'Pays',
        support: 'Support'
      }
    },
    categories: {
      title: 'Catégories Populaires',
      electronics: 'Électronique',
      smartphones: 'Smartphones',
      computers: 'Ordinateurs',
      sports: 'Sport',
      vehicles: 'Véhicules',
      fashion: 'Mode'
    },
    products: {
      title: 'Produits Premium VVS',
      subtitle: 'Découvrez notre sélection exclusive de produits haut de gamme',
      new: '💎 Nouveautés',
      bestseller: '🔥 Meilleures ventes',
      promotion: '⚡ Promotions',
      addToCart: 'Ajouter',
      inStock: 'en stock'
    },
    promo: {
      title: '⚡ Offres Flash - Promotions',
      subtitle: 'Dernières heures pour profiter de ces offres exceptionnelles',
      freeShipping: 'Livraison GRATUITE en RDC dès $50',
      flashSale: 'SUPER PROMO: Jusqu\'à -70% sur l\'électronique!',
      newVendors: 'Nouveaux vendeurs: -25% sur tout!',
      buyNow: '🛒 Acheter maintenant',
      remaining: 'restants'
    },
    common: {
      search: 'Rechercher',
      cart: 'Panier',
      total: 'Total',
      currency: 'Devise',
      language: 'Langue',
      addToCart: 'Ajouter au panier',
      new: 'Nouveau',
      bestseller: 'Meilleure vente',
      promotion: 'Promotion',
      premium: 'Premium',
      all: 'Tous',
      viewDetails: 'Voir détails',
      previous: 'Précédent',
      next: 'Suivant'
    },
    nav: {
      home: 'Accueil',
      products: 'Produits'
    },
    productDetail: {
      title: 'Détail du produit',
      options: 'Options',
      quantity: 'Quantité',
      inStock: 'en stock',
      addToWishlist: 'Ajouter aux favoris',
      share: 'Partager',
      category: 'Catégorie',
      tags: 'Tags'
    },
    productList: {
      subtitle: 'Découvrez notre sélection de produits',
      sortBy: 'Trier par',
      sortName: 'Nom',
      sortPrice: 'Prix',
      sortNewest: 'Plus récent',
      searchPlaceholder: 'Rechercher des produits...',
      noProducts: 'Aucun produit trouvé',
      noProductsDesc: 'Essayez de modifier vos filtres ou votre recherche.'
    }
  },
  en: {
    hero: {
      title: 'VVS Store',
      subtitle: 'Premium Marketplace - DRC',
      description: '🇨🇩 Discover exceptional products from DRC',
      startShopping: '🛍️ Start Shopping',
      becomeVendor: '🏪 Become Vendor',
      productsCount: 'Over 10M products available',
      stats: {
        products: 'Products',
        vendors: 'Vendors',
        countries: 'Countries',
        support: 'Support'
      }
    },
    categories: {
      title: 'Popular Categories',
      electronics: 'Electronics',
      smartphones: 'Smartphones',
      computers: 'Computers',
      sports: 'Sports',
      vehicles: 'Vehicles',
      fashion: 'Fashion'
    },
    products: {
      title: 'VVS Premium Products',
      subtitle: 'Discover our exclusive selection of high-end products',
      new: '💎 New Arrivals',
      bestseller: '🔥 Best Sellers',
      promotion: '⚡ Promotions',
      addToCart: 'Add to Cart',
      inStock: 'in stock'
    },
    promo: {
      title: '⚡ Flash Deals - Promotions',
      subtitle: 'Last hours to enjoy these exceptional offers',
      freeShipping: 'FREE Shipping in DRC from $50',
      flashSale: 'SUPER SALE: Up to -70% on electronics!',
      newVendors: 'New vendors: -25% on everything!',
      buyNow: '🛒 Buy Now',
      remaining: 'remaining'
    },
    common: {
      search: 'Search',
      cart: 'Cart',
      total: 'Total',
      currency: 'Currency',
      language: 'Language',
      addToCart: 'Add to Cart',
      new: 'New',
      bestseller: 'Bestseller',
      promotion: 'Promotion',
      premium: 'Premium',
      all: 'All',
      viewDetails: 'View Details',
      previous: 'Previous',
      next: 'Next'
    },
    nav: {
      home: 'Home',
      products: 'Products'
    },
    productDetail: {
      title: 'Product Detail',
      options: 'Options',
      quantity: 'Quantity',
      inStock: 'in stock',
      addToWishlist: 'Add to Wishlist',
      share: 'Share',
      category: 'Category',
      tags: 'Tags'
    },
    productList: {
      subtitle: 'Discover our selection of products',
      sortBy: 'Sort by',
      sortName: 'Name',
      sortPrice: 'Price',
      sortNewest: 'Newest',
      searchPlaceholder: 'Search products...',
      noProducts: 'No products found',
      noProductsDesc: 'Try modifying your filters or search.'
    }
  },
  ar: {
    hero: {
      title: 'متجر VVS',
      subtitle: 'سوق متميز - جمهورية الكونغو الديمقراطية',
      description: '🇨🇩 اكتشف منتجات استثنائية من جمهورية الكونغو الديمقراطية',
      startShopping: '🛍️ ابدأ التسوق',
      becomeVendor: '🏪 كن بائعاً',
      productsCount: 'أكثر من 10 مليون منتج متاح',
      stats: {
        products: 'المنتجات',
        vendors: 'البائعون',
        countries: 'البلدان',
        support: 'الدعم'
      }
    },
    categories: {
      title: 'الفئات الشائعة',
      electronics: 'الإلكترونيات',
      smartphones: 'الهواتف الذكية',
      computers: 'أجهزة الكمبيوتر',
      sports: 'الرياضة',
      vehicles: 'المركبات',
      fashion: 'الأزياء'
    },
    products: {
      title: 'منتجات VVS المتميزة',
      subtitle: 'اكتشف مجموعتنا الحصرية من المنتجات عالية الجودة',
      new: '💎 وصل حديثاً',
      bestseller: '🔥 الأكثر مبيعاً',
      promotion: '⚡ العروض',
      addToCart: 'أضف للسلة',
      inStock: 'متوفر'
    },
    promo: {
      title: '⚡ عروض البرق - التخفيضات',
      subtitle: 'ساعات أخيرة للاستفادة من هذه العروض الاستثنائية',
      freeShipping: 'شحن مجاني في الكونغو من 50 دولار',
      flashSale: 'عرض كبير: خصم يصل إلى 70% على الإلكترونيات!',
      newVendors: 'بائعون جدد: خصم 25% على كل شيء!',
      buyNow: '🛒 اشتري الآن',
      remaining: 'متبقي'
    },
    common: {
      search: 'بحث',
      cart: 'السلة',
      total: 'المجموع',
      currency: 'العملة',
      language: 'اللغة',
      addToCart: 'أضف للسلة',
      new: 'جديد',
      bestseller: 'الأكثر مبيعاً',
      promotion: 'عرض',
      premium: 'مميز',
      all: 'الكل',
      viewDetails: 'عرض التفاصيل',
      previous: 'السابق',
      next: 'التالي'
    },
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات'
    },
    productDetail: {
      title: 'تفاصيل المنتج',
      options: 'الخيارات',
      quantity: 'الكمية',
      inStock: 'متوفر',
      addToWishlist: 'أضف للمفضلة',
      share: 'مشاركة',
      category: 'الفئة',
      tags: 'العلامات'
    },
    productList: {
      subtitle: 'اكتشف مجموعة منتجاتنا',
      sortBy: 'ترتيب حسب',
      sortName: 'الاسم',
      sortPrice: 'السعر',
      sortNewest: 'الأحدث',
      searchPlaceholder: 'البحث عن منتجات...',
      noProducts: 'لم يتم العثور على منتجات',
      noProductsDesc: 'جرب تعديل الفلاتر أو البحث.'
    }
  }
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
  { code: 'CDF', symbol: 'FC', name: 'Franc Congolais', rate: 2000 }
]

export const useLocaleStore = defineStore('locale', () => {
  const currentLanguage = ref<'fr' | 'en' | 'ar'>('fr')
  const currentCurrency = ref<Currency>(currencies[0])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[currentLanguage.value]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const formatPrice = (price: number): string => {
    const convertedPrice = price * currentCurrency.value.rate
    return `${currentCurrency.value.symbol}${convertedPrice.toFixed(2)}`
  }

  const setLanguage = (lang: 'fr' | 'en' | 'ar') => {
    currentLanguage.value = lang
  }

  const setCurrency = (currency: Currency) => {
    currentCurrency.value = currency
  }

  const isRTL = computed(() => currentLanguage.value === 'ar')

  return {
    currentLanguage,
    currentCurrency,
    currencies,
    t,
    formatPrice,
    setLanguage,
    setCurrency,
    isRTL
  }
})
