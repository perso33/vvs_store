import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import { useAuthStore } from './store/auth'
import './style.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

// Initialize auth state
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
