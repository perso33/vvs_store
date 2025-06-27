import { defineStore } from 'pinia'
import type { User, AuthState } from '../types'

// Mock users for testing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Super Admin',
    role: 'super_admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'tech@example.com',
    name: 'Tech Store Admin',
    role: 'store_admin',
    createdAt: new Date('2024-01-15'),
  },
]

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token && !!this.user
    },

    isSuperAdmin(): boolean {
      return this.user?.role === 'super_admin'
    },

    isStoreAdmin(): boolean {
      return this.user?.role === 'store_admin'
    },

    canManageStores(): boolean {
      return this.isSuperAdmin
    },

    canManageOwnStore(): boolean {
      return this.isStoreAdmin || this.isSuperAdmin
    },
  },

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Find user by email (in real app, this would be server-side validation)
        const user = mockUsers.find(u => u.email === email)
        
        if (user && password === 'password') {
          this.user = user
          this.token = `mock_token_${user.id}`
          localStorage.setItem('auth_token', this.token)
          localStorage.setItem('user', JSON.stringify(user))
          return true
        }
        
        return false
      } finally {
        this.isLoading = false
      }
    },

    async logout(): Promise<void> {
      this.user = null
      this.token = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    },

    async checkAuth(): Promise<void> {
      if (this.token) {
        const userData = localStorage.getItem('user')
        if (userData) {
          try {
            this.user = JSON.parse(userData)
          } catch {
            await this.logout()
          }
        }
      }
    },

    async register(userData: { email: string; name: string; password: string }): Promise<boolean> {
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user already exists
        if (mockUsers.find(u => u.email === userData.email)) {
          return false
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          role: 'store_admin',
          createdAt: new Date(),
        }

        mockUsers.push(newUser)
        
        // Auto-login after registration
        this.user = newUser
        this.token = `mock_token_${newUser.id}`
        localStorage.setItem('auth_token', this.token)
        localStorage.setItem('user', JSON.stringify(newUser))
        
        return true
      } finally {
        this.isLoading = false
      }
    },
  },
})
