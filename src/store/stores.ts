import { defineStore } from 'pinia'
import type { Store, StoreSettings } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// Mock data for demonstration
const mockStores: Store[] = [
  {
    id: '1',
    name: 'TechStore',
    description: 'Your one-stop shop for all tech gadgets and accessories',
    logo: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=TS',
    banner: 'https://via.placeholder.com/800x300/3B82F6/FFFFFF?text=TechStore',
    adminId: '2',
    status: 'active',
    settings: {
      currency: 'EUR',
      allowReviews: true,
      theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
      },
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'FashionHub',
    description: 'Trendy fashion for everyone',
    logo: 'https://via.placeholder.com/150x150/EC4899/FFFFFF?text=FH',
    banner: 'https://via.placeholder.com/800x300/EC4899/FFFFFF?text=FashionHub',
    adminId: '3',
    status: 'active',
    settings: {
      currency: 'EUR',
      allowReviews: true,
      theme: {
        primaryColor: '#EC4899',
        secondaryColor: '#BE185D',
      },
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date(),
  },
]

export const useStoresStore = defineStore('stores', {
  state: () => ({
    stores: [...mockStores] as Store[],
    currentStore: null as Store | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getStoreById: (state) => (id: string) => {
      return state.stores.find(store => store.id === id)
    },
    
    getStoresByAdmin: (state) => (adminId: string) => {
      return state.stores.filter(store => store.adminId === adminId)
    },
    
    activeStores: (state) => {
      return state.stores.filter(store => store.status === 'active')
    },
    
    totalStores: (state) => state.stores.length,
  },

  actions: {
    async fetchStores() {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        // Data is already loaded from mock
        this.loading = false
      } catch (error) {
        this.error = 'Failed to fetch stores'
        this.loading = false
        throw error
      }
    },

    async createStore(storeData: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newStore: Store = {
          ...storeData,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        this.stores.push(newStore)
        this.loading = false
        
        return newStore
      } catch (error) {
        this.error = 'Failed to create store'
        this.loading = false
        throw error
      }
    },

    async updateStore(id: string, updates: Partial<Store>) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const index = this.stores.findIndex(store => store.id === id)
        if (index === -1) {
          throw new Error('Store not found')
        }
        
        this.stores[index] = {
          ...this.stores[index],
          ...updates,
          updatedAt: new Date(),
        }
        
        this.loading = false
        return this.stores[index]
      } catch (error) {
        this.error = 'Failed to update store'
        this.loading = false
        throw error
      }
    },

    async deleteStore(id: string) {
      this.loading = true
      this.error = null
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const index = this.stores.findIndex(store => store.id === id)
        if (index === -1) {
          throw new Error('Store not found')
        }
        
        this.stores.splice(index, 1)
        this.loading = false
      } catch (error) {
        this.error = 'Failed to delete store'
        this.loading = false
        throw error
      }
    },

    setCurrentStore(store: Store | null) {
      this.currentStore = store
    },

    async updateStoreSettings(storeId: string, settings: StoreSettings) {
      const store = this.getStoreById(storeId)
      if (store) {
        await this.updateStore(storeId, { settings })
      }
    },
  },
})
