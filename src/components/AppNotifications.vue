<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationsStore } from '@/store/notifications'
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'

const notificationsStore = useNotificationsStore()

const notifications = computed(() => notificationsStore.notifications)

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'error':
      return XCircleIcon
    case 'info':
    default:
      return InformationCircleIcon
  }
}

const getIconColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'error':
      return 'text-red-500'
    case 'info':
    default:
      return 'text-blue-500'
  }
}

const getBorderColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-green-200'
    case 'warning':
      return 'border-yellow-200'
    case 'error':
      return 'border-red-200'
    case 'info':
    default:
      return 'border-blue-200'
  }
}

const getBgColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-50'
    case 'warning':
      return 'bg-yellow-50'
    case 'error':
      return 'bg-red-50'
    case 'info':
    default:
      return 'bg-blue-50'
  }
}

const removeNotification = (id: string) => {
  notificationsStore.removeNotification(id)
}
</script>

<template>
  <Teleport to="body">
    <!-- Notifications container -->
    <div
      class="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-x-full"
        enter-to-class="opacity-100 transform translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-x-0"
        leave-to-class="opacity-0 transform translate-x-full"
        move-class="transition duration-300 ease-in-out"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'pointer-events-auto bg-white rounded-lg shadow-lg border-l-4 p-4',
            getBorderColor(notification.type),
            getBgColor(notification.type),
          ]"
          role="alert"
          :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component
                :is="getIcon(notification.type)"
                :class="['w-5 h-5', getIconColor(notification.type)]"
              />
            </div>
            <div class="ml-3 flex-1">
              <h4 class="text-sm font-medium text-gray-900">
                {{ notification.title }}
              </h4>
              <p class="mt-1 text-sm text-gray-600">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button
                @click="removeNotification(notification.id)"
                class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                :aria-label="`Fermer la notification: ${notification.title}`"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
