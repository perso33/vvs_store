<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6">
      <!-- Logo & Header -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl flex items-center justify-center shadow-2xl">
            <span class="text-white font-black text-3xl tracking-tight">VVS</span>
          </div>
        </div>
        <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
          Bienvenue sur
        </h2>
        <div class="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          VVS Store
        </div>
        <p class="text-base text-gray-600">
          Connectez-vous à votre espace marchand premium
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-8 border border-white/20">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Adresse email
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="exemple@email.com"
                />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-4 bg-white/70 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-purple-600 transition-colors"
                >
                  <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
              />
              <span class="ml-2 text-sm text-gray-700 font-medium">Se souvenir de moi</span>
            </label>

            <a href="#" class="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-bold rounded-2xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <svg v-if="authStore.isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ authStore.isLoading ? 'Connexion...' : '🚀 Se connecter' }}
          </button>
        </form>

        <!-- Quick Login pour les tests -->
        <div class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
          <p class="text-sm text-gray-600 mb-3 font-medium text-center">🧪 Comptes de test disponibles :</p>
          <div class="text-xs text-gray-500 mb-3 text-center">
            📧 Email: [email ci-dessous] | 🔑 Mot de passe: <span class="font-mono bg-gray-100 px-2 py-1 rounded">password</span>
          </div>
          <div class="grid grid-cols-1 gap-3">
            <button
              @click="quickLogin('admin')"
              class="w-full text-left px-4 py-3 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span class="text-white text-lg">👨‍💼</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 group-hover:text-purple-700">Super Admin</div>
                  <div class="text-xs text-gray-500">admin@example.com</div>
                </div>
              </div>
            </button>
            <button
              @click="quickLogin('vendor')"
              class="w-full text-left px-4 py-3 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span class="text-white text-lg">🏪</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 group-hover:text-purple-700">Store Admin</div>
                  <div class="text-xs text-gray-500">vendor@example.com</div>
                </div>
              </div>
            </button>
            <button
              @click="quickLogin('customer')"
              class="w-full text-left px-4 py-3 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span class="text-white text-lg">🛍️</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 group-hover:text-purple-700">Client VVS</div>
                  <div class="text-xs text-gray-500">user@example.com</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Sign up link -->
      <div class="text-center">
        <p class="text-base text-gray-600">
          Pas encore de compte ?
          <router-link to="/register" class="font-bold text-purple-600 hover:text-purple-700 transition-colors">
            Créer un compte
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useNotificationsStore } from '@/store/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const handleLogin = async () => {
  try {
    console.log('🔐 Tentative de connexion avec:', { email: form.value.email, password: form.value.password })
    
    const success = await authStore.login(form.value.email, form.value.password)
    
    console.log('🔐 Résultat du login:', success)
    console.log('🔐 User après login:', authStore.user)
    
    if (success) {
      notificationsStore.addNotification({
        type: 'success',
        title: 'Connexion réussie',
        message: `Bienvenue ${authStore.user?.name} !`,
      })
      
      // Redirect based on user role
      if (authStore.user?.role === 'super_admin') {
        console.log('🔐 Redirection vers admin/dashboard')
        router.push('/admin/dashboard')
      } else if (authStore.user?.role === 'store_admin') {
        console.log('🔐 Redirection vers vendor/dashboard')
        router.push('/vendor/dashboard')
      } else {
        console.log('🔐 Redirection vers home')
        router.push('/')
      }
    } else {
      console.log('🔐 Échec de connexion')
      notificationsStore.addNotification({
        type: 'error',
        title: 'Erreur de connexion',
        message: 'Email ou mot de passe incorrect.',
      })
    }
  } catch (error) {
    console.error('🔐 Erreur pendant la connexion:', error)
    notificationsStore.addNotification({
      type: 'error',
      title: 'Erreur',
      message: 'Une erreur est survenue lors de la connexion.',
    })
  }
}

const quickLogin = async (type: 'admin' | 'vendor' | 'customer') => {
  const credentials = {
    admin: { email: 'admin@example.com', password: 'password' },
    vendor: { email: 'vendor@example.com', password: 'password' },
    customer: { email: 'user@example.com', password: 'password' },
  }
  
  form.value.email = credentials[type].email
  form.value.password = credentials[type].password
  await handleLogin()
}
</script>
