import { createPinia } from 'pinia'

export const pinia = createPinia()

// Export all stores
export { useAuthStore } from './auth'
export { useStoresStore } from './stores'
export { useProductsStore } from './products'
export { useNotificationsStore } from './notifications'
