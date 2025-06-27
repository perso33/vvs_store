import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { useAuthStore } from './store/auth'
import './style.css'

// Force le cache de la barre d'adresse sur mobile
if (window.innerWidth <= 768) {
  // Cache la barre d'adresse après le chargement
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 0)
  })
  
  // Cache la barre d'adresse au redimensionnement
  window.addEventListener('resize', () => {
    if (window.orientation !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 500)
    }
  })
  
  // Cache la barre d'adresse lors du changement d'orientation
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 500)
  })
}

const app = createApp(App)

app.use(pinia)
app.use(router)

// Initialize auth state
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
