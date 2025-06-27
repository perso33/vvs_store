import { defineStore } from 'pinia'
import type { Product, Category } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// Mock categories
const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱' },
  { id: '2', name: 'Computers', icon: '💻', parentId: '1' },
  { id: '3', name: 'Smartphones', icon: '📱', parentId: '1' },
  { id: '4', name: 'Fashion', icon: '👕' },
  { id: '5', name: 'Men\'s Clothing', icon: '👔', parentId: '4' },
  { id: '6', name: 'Women\'s Clothing', icon: '👗', parentId: '4' },
  { id: '7', name: 'Home & Garden', icon: '🏠' },
  { id: '8', name: 'Sports', icon: '⚽' },
]

// Mock products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Le summum de la technologie Apple avec écran Super Retina XDR',
    price: 1299,
    promoPrice: 1199,
    isPromo: true,
    promoPercent: 8,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    soldCount: 342,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1551212850-1b2e8e27c15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    ],
    category: 'Smartphones',
    storeId: '1',
    stock: 25,
    status: 'active',
    tags: ['smartphone', 'apple', 'premium'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'MacBook Pro 16" M3 Pro',
    description: 'Ordinateur portable professionnel avec puce M3 révolutionnaire',
    price: 2499,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    soldCount: 156,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Computers',
    storeId: '1',
    stock: 12,
    status: 'active',
    tags: ['laptop', 'apple', 'professional'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'AirPods Pro 3ème génération',
    description: 'Écouteurs sans fil avec réduction de bruit adaptative',
    price: 299,
    promoPrice: 249,
    isPromo: true,
    promoPercent: 17,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    soldCount: 892,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Electronics',
    storeId: '1',
    stock: 45,
    status: 'active',
    tags: ['headphones', 'wireless', 'audio'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Apple Watch Series 9 GPS',
    description: 'Montre connectée la plus avancée avec écran Retina Always-On',
    price: 449,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    soldCount: 234,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Electronics',
    storeId: '1',
    stock: 38,
    status: 'active',
    tags: ['smartwatch', 'apple', 'fitness'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" M2 WiFi',
    description: 'Tablette professionnelle pour créatifs et professionnels',
    price: 1199,
    promoPrice: 999,
    isPromo: true,
    promoPercent: 17,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    soldCount: 445,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Computers',
    storeId: '1',
    stock: 22,
    status: 'active',
    tags: ['tablet', 'apple', 'creative'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone Android premium avec stylet S Pen intégré',
    price: 1199,
    promoPrice: 1099,
    isPromo: true,
    promoPercent: 8,
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    soldCount: 567,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Smartphones',
    storeId: '2',
    stock: 34,
    status: 'active',
    tags: ['smartphone', 'samsung', 'android'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    description: 'Casque antibruit leader de l\'industrie avec 30h d\'autonomie',
    price: 399,
    promoPrice: 329,
    isPromo: true,
    promoPercent: 18,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    soldCount: 723,
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Electronics',
    storeId: '2',
    stock: 67,
    status: 'active',
    tags: ['headphones', 'sony', 'noise-cancelling'],
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Dell XPS 13 Plus',
    description: 'Ultrabook premium avec écran InfinityEdge et clavier tactile',
    price: 1599,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.5,
    soldCount: 89,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Computers',
    storeId: '2',
    stock: 15,
    status: 'active',
    tags: ['laptop', 'dell', 'ultrabook'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
  {
    id: '9',
    name: 'Nike Air Max 270',
    description: 'Baskets lifestyle avec amorti Air Max visible',
    price: 149,
    promoPrice: 119,
    isPromo: true,
    promoPercent: 20,
    isNew: false,
    isBestSeller: true,
    rating: 4.6,
    soldCount: 1234,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Sports',
    storeId: '3',
    stock: 120,
    status: 'active',
    tags: ['sneakers', 'nike', 'sport'],
    variants: [
      { id: 'v1', name: '40 - Noir', price: 149, stock: 20, attributes: { size: '40', color: 'Noir' } },
      { id: 'v2', name: '41 - Noir', price: 149, stock: 25, attributes: { size: '41', color: 'Noir' } },
      { id: 'v3', name: '42 - Blanc', price: 149, stock: 30, attributes: { size: '42', color: 'Blanc' } },
      { id: 'v4', name: '43 - Blanc', price: 149, stock: 25, attributes: { size: '43', color: 'Blanc' } },
      { id: 'v5', name: '44 - Rouge', price: 149, stock: 20, attributes: { size: '44', color: 'Rouge' } },
    ],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'Adidas Ultraboost 23',
    description: 'Chaussures de running avec technologie Boost Energy Return',
    price: 189,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.7,
    soldCount: 456,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Sports',
    storeId: '3',
    stock: 85,
    status: 'active',
    tags: ['running', 'adidas', 'boost'],
    variants: [
      { id: 'v6', name: '39 - Noir/Blanc', price: 189, stock: 15, attributes: { size: '39', color: 'Noir/Blanc' } },
      { id: 'v7', name: '40 - Noir/Blanc', price: 189, stock: 20, attributes: { size: '40', color: 'Noir/Blanc' } },
      { id: 'v8', name: '41 - Bleu/Blanc', price: 189, stock: 25, attributes: { size: '41', color: 'Bleu/Blanc' } },
      { id: 'v9', name: '42 - Bleu/Blanc', price: 189, stock: 25, attributes: { size: '42', color: 'Bleu/Blanc' } },
    ],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
  },
  {
    id: '11',
    name: 'Canon EOS R6 Mark II',
    description: 'Appareil photo hybride professionnel 24.2MP avec stabilisation',
    price: 2499,
    promoPrice: 2199,
    isPromo: true,
    promoPercent: 12,
    isNew: false,
    isBestSeller: false,
    rating: 4.9,
    soldCount: 178,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Electronics',
    storeId: '4',
    stock: 8,
    status: 'active',
    tags: ['camera', 'canon', 'photography'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date(),
  },
  {
    id: '12',
    name: 'Tesla Model Y Performance',
    description: 'SUV électrique haute performance avec conduite autonome',
    price: 63999,
    isPromo: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    soldCount: 67,
    images: [
      'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Vehicles',
    storeId: '4',
    stock: 3,
    status: 'active',
    tags: ['electric', 'tesla', 'suv'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date(),
  },
]

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [...mockProducts] as Product[],
    categories: [...mockCategories] as Category[],
    currentProduct: null as Product | null,
    loading: false,
    error: null as string | null,
    filters: {
      category: '',
      priceRange: [0, 5000],
      search: '',
      storeId: '',
      status: 'all',
    },
  }),

  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id)
    },
    
    getProductsByStore: (state) => (storeId: string) => {
      return state.products.filter(product => product.storeId === storeId)
    },
    
    getProductsByCategory: (state) => (category: string) => {
      return state.products.filter(product => product.category === category)
    },
    
    filteredProducts: (state) => {
      let filtered = [...state.products]
      
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }
      
      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category)
      }
      
      if (state.filters.storeId) {
        filtered = filtered.filter(product => product.storeId === state.filters.storeId)
      }
      
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(product => product.status === state.filters.status)
      }
      
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      )
      
      return filtered
    },
    
    totalProducts: (state) => state.products.length,
    
    getCategoryById: (state) => (id: string) => {
      return state.categories.find(category => category.id === id)
    },
    
    getCategoryByName: (state) => (name: string) => {
      return state.categories.find(category => category.name === name)
    },
    
    topLevelCategories: (state) => {
      return state.categories.filter(category => !category.parentId)
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        // Data is already loaded from mock
        this.loading = false
      } catch (error) {
        this.error = 'Failed to fetch products'
        this.loading = false
        throw error
      }
    },

    async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newProduct: Product = {
          ...productData,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        this.products.push(newProduct)
        this.loading = false
        
        return newProduct
      } catch (error) {
        this.error = 'Failed to create product'
        this.loading = false
        throw error
      }
    },

    async updateProduct(id: string, updates: Partial<Product>) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
          throw new Error('Product not found')
        }
        
        this.products[index] = {
          ...this.products[index],
          ...updates,
          updatedAt: new Date(),
        }
        
        this.loading = false
        return this.products[index]
      } catch (error) {
        this.error = 'Failed to update product'
        this.loading = false
        throw error
      }
    },

    async deleteProduct(id: string) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
          throw new Error('Product not found')
        }
        
        this.products.splice(index, 1)
        this.loading = false
      } catch (error) {
        this.error = 'Failed to delete product'
        this.loading = false
        throw error
      }
    },

    setCurrentProduct(product: Product | null) {
      this.currentProduct = product
    },

    updateFilters(newFilters: Partial<typeof this.filters>) {
      this.filters = { ...this.filters, ...newFilters }
    },

    clearFilters() {
      this.filters = {
        category: '',
        priceRange: [0, 5000],
        search: '',
        storeId: '',
        status: 'all',
      }
    },

    async fetchCategories() {
      // Categories are already loaded from mock data
      return this.categories
    },
  },
})
