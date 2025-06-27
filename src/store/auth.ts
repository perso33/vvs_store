import { defineStore } from 'pinia'
import type { User, AuthState } from '@/types'

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Super Admin',
    role: 'super_admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'vendor@example.com',
    name: 'Store Admin',
    role: 'store_admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'store1@example.com',
    name: 'Store Admin 1',
    role: 'store_admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    email: 'user@example.com',
    name: 'Client VVS',
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isSuperAdmin: (state) => state.user?.role === 'super_admin',
    isStoreAdmin: (state) => state.user?.role === 'store_admin',
    userRole: (state) => state.user?.role,
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      
      try {
        console.log('🔐 Store: Début du processus de login pour:', email)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Find user in mock data
        const user = mockUsers.find(u => u.email === email)
        
        console.log('🔐 Store: Utilisateur trouvé:', user)
        console.log('🔐 Store: Mot de passe fourni:', password)
        console.log('🔐 Store: Mot de passe requis: password')
        
        if (!user) {
          console.log('🔐 Store: Utilisateur non trouvé')
          this.isLoading = false
          return false
        }

        // Mock password validation (in real app, this would be handled by backend)
        if (password !== 'password') {
          console.log('🔐 Store: Mot de passe incorrect')
          this.isLoading = false
          return false
        }

        console.log('🔐 Store: Authentification réussie')
        
        this.user = user
        this.token = `mock-token-${user.id}`
        this.isAuthenticated = true

        // Store in localStorage for persistence
        localStorage.setItem('auth_token', this.token)
        localStorage.setItem('auth_user', JSON.stringify(user))

        console.log('🔐 Store: État mis à jour:', { user: this.user, isAuthenticated: this.isAuthenticated })

        this.isLoading = false
        return true
      } catch (error) {
        console.error('🔐 Store: Erreur de login:', error)
        this.isLoading = false
        return false
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },

    async initializeAuth() {
      // Check if user is already logged in
      const token = localStorage.getItem('auth_token')
      const userStr = localStorage.getItem('auth_user')
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User
          this.user = user
          this.token = token
          this.isAuthenticated = true
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          this.logout()
        }
      }
    },

    async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === userData.email)
        if (existingUser) {
          throw new Error('User already exists')
        }

        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        // Add to mock data
        mockUsers.push(newUser)

        return { success: true, user: newUser }
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },
  },
})
