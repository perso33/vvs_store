<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useNotificationsStore } from '@/store/notifications'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const showPassword = ref(false)
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
  general: '',
})

const validateForm = () => {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  let isValid = true

  if (!form.email) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format d\'email invalide'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est requis'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    await authStore.login(form.email, form.password)
    
    notificationsStore.success(
      'Connexion réussie',
      `Bienvenue ${authStore.user?.name} !`
    )

    // Redirect based on user role
    if (authStore.isSuperAdmin) {
      router.push('/admin')
    } else if (authStore.isStoreAdmin) {
      router.push('/vendor')
    } else {
      router.push('/')
    }
  } catch (error: any) {
    errors.general = error.message || 'Erreur de connexion'
    notificationsStore.error(
      'Erreur de connexion',
      'Vérifiez vos identifiants et réessayez'
    )
  } finally {
    loading.value = false
  }
}

// Demo credentials helper
const fillDemoCredentials = (role: 'super_admin' | 'store_admin') => {
  if (role === 'super_admin') {
    form.email = 'admin@example.com'
  } else {
    form.email = 'store1@example.com'
  }
  form.password = 'password123'
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 sm:space-y-8">
      <div class="text-center">
        <div class="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
          <span class="text-white font-bold text-lg sm:text-xl">VVS</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Connexion
        </h2>
        <p class="mt-1 sm:mt-2 text-sm text-gray-600">
          Ou
          <RouterLink to="/register" class="font-medium text-purple-600 hover:text-purple-500">
            créez un nouveau compte
          </RouterLink>
        </p>
      </div>

      <!-- Demo Credentials -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <h3 class="text-sm font-medium text-blue-800 mb-2">Comptes de démonstration:</h3>
        <div class="space-y-1 sm:space-y-2">
          <button
            @click="fillDemoCredentials('super_admin')"
            type="button"
            class="text-xs text-blue-700 hover:text-blue-900 underline block"
          >
            Super Admin (admin@example.com)
          </button>
          <button
            @click="fillDemoCredentials('store_admin')"
            type="button"
            class="text-xs text-blue-700 hover:text-blue-900 underline block"
          >
            Admin Boutique (store1@example.com)
          </button>
          <p class="text-xs text-blue-600">Mot de passe: password123</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        <!-- General Error -->
        <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-600">{{ errors.general }}</p>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Adresse email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.email }"
            placeholder="votre@email.com"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="input pr-10"
              :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.password }"
              placeholder="Votre mot de passe"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
              <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion...
          </span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="text-center">
        <RouterLink
          to="/"
          class="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Retour à l'accueil
        </RouterLink>
      </div>
    </div>
  </div>
</template>
