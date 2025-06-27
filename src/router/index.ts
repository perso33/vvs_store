import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'

// Import views
import Home from '@/client/views/Home.vue'
import AlibabaHome from '@/client/views/AlibabaHome.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AlibabaLogin from '@/views/AlibabaLogin.vue'

// Admin views
import AdminDashboard from '@/admin/views/Dashboard.vue'
import AdminStores from '@/admin/views/Stores.vue'
import AdminStoreDetail from '@/admin/views/StoreDetail.vue'

// Vendor views
import VendorDashboard from '@/vendor/views/Dashboard.vue'
import VendorProducts from '@/vendor/views/Products.vue'
import VendorProductForm from '@/vendor/views/ProductForm.vue'
import VendorSettings from '@/vendor/views/Settings.vue'

// Client views
import ProductList from '@/client/views/ProductList.vue'
import ProductDetail from '@/client/views/ProductDetail.vue'
import StoreDetail from '@/client/views/StoreDetail.vue'

// Checkout views
import Checkout from '@/views/Checkout.vue'
import OrderSuccess from '@/views/OrderSuccess.vue'

const routes: RouteRecordRaw[] = [
  // Public routes
  {
    path: '/',
    name: 'Home',
    component: AlibabaHome,
  },
  {
    path: '/classic',
    name: 'ClassicHome',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: AlibabaLogin,
    meta: { requiresGuest: true },
  },
  {
    path: '/login-classic',
    name: 'ClassicLogin',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  
  // Client routes
  {
    path: '/products',
    name: 'Products',
    component: ProductList,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/stores/:id',
    name: 'StoreDetail',
    component: StoreDetail,
    props: true,
  },
  
  // Checkout routes
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess,
  },
  
  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresRole: 'super_admin' },
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  {
    path: '/admin/stores',
    name: 'AdminStores',
    component: AdminStores,
    meta: { requiresAuth: true, requiresRole: 'super_admin' },
  },
  {
    path: '/admin/stores/:id',
    name: 'AdminStoreDetail',
    component: AdminStoreDetail,
    props: true,
    meta: { requiresAuth: true, requiresRole: 'super_admin' },
  },
  
  // Vendor routes
  {
    path: '/vendor/dashboard',
    name: 'VendorDashboard',
    component: VendorDashboard,
    meta: { requiresAuth: true, requiresRole: 'store_admin' },
  },
  {
    path: '/vendor',
    redirect: '/vendor/dashboard',
  },
  {
    path: '/vendor/products',
    name: 'VendorProducts',
    component: VendorProducts,
    meta: { requiresAuth: true, requiresRole: 'store_admin' },
  },
  {
    path: '/vendor/products/new',
    name: 'VendorProductNew',
    component: VendorProductForm,
    meta: { requiresAuth: true, requiresRole: 'store_admin' },
  },
  {
    path: '/vendor/products/:id/edit',
    name: 'VendorProductEdit',
    component: VendorProductForm,
    props: true,
    meta: { requiresAuth: true, requiresRole: 'store_admin' },
  },
  {
    path: '/vendor/settings',
    name: 'VendorSettings',
    component: VendorSettings,
    meta: { requiresAuth: true, requiresRole: 'store_admin' },
  },
  
  // Catch all route - 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect based on user role
    if (authStore.isSuperAdmin) {
      next('/admin')
    } else if (authStore.isStoreAdmin) {
      next('/vendor')
    } else {
      next('/')
    }
    return
  }
  
  // Check role-based access
  if (to.meta.requiresRole && authStore.user?.role !== to.meta.requiresRole) {
    next('/')
    return
  }
  
  next()
})

export default router
