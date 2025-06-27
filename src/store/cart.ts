import { defineStore } from 'pinia'
import type { CartItem, Product, ProductVariant, Cart } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: JSON.parse(localStorage.getItem('vvs_cart') || '[]'),
    isOpen: false,
  }),

  getters: {
    itemCount(): number {
      return this.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice(): number {
      return this.items.reduce((total, item) => {
        // Use promotional price if available, otherwise use variant price or base price
        const basePrice = item.selectedVariant?.price || item.product.price
        const finalPrice = item.product.promotionalPrice || basePrice
        return total + (finalPrice * item.quantity)
      }, 0)
    },

    cart(): Cart {
      return {
        items: this.items,
        total: this.totalPrice,
        itemCount: this.itemCount,
      }
    },

    isEmpty(): boolean {
      return this.items.length === 0
    },
  },

  actions: {
    addToCart(product: Product, quantity: number = 1, variant?: ProductVariant) {
      const existingItemIndex = this.items.findIndex(
        item => item.productId === product.id && 
                 item.variantId === variant?.id
      )

      if (existingItemIndex > -1) {
        this.items[existingItemIndex].quantity += quantity
      } else {
        const cartItem: CartItem = {
          id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
          productId: product.id,
          variantId: variant?.id,
          quantity,
          product,
          selectedVariant: variant,
        }
        this.items.push(cartItem)
      }

      this.saveToStorage()
    },

    removeFromCart(itemId: string) {
      const index = this.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()
      }
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(itemId)
        } else {
          item.quantity = quantity
          this.saveToStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    saveToStorage() {
      localStorage.setItem('vvs_cart', JSON.stringify(this.items))
    },
  },
})
