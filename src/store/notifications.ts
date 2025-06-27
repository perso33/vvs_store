import { defineStore } from 'pinia'
import type { AppNotification } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as AppNotification[],
  }),

  actions: {
    addNotification(notification: Omit<AppNotification, 'id'>) {
      const newNotification: AppNotification = {
        ...notification,
        id: uuidv4(),
      }
      
      this.notifications.push(newNotification)
      
      // Auto-remove notification after duration
      const duration = notification.duration || 5000
      setTimeout(() => {
        this.removeNotification(newNotification.id)
      }, duration)
      
      return newNotification.id
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearAll() {
      this.notifications = []
    },

    // Convenience methods
    success(title: string, message: string, duration?: number) {
      return this.addNotification({
        type: 'success',
        title,
        message,
        duration,
      })
    },

    error(title: string, message: string, duration?: number) {
      return this.addNotification({
        type: 'error',
        title,
        message,
        duration: duration || 8000, // Errors stay longer
      })
    },

    warning(title: string, message: string, duration?: number) {
      return this.addNotification({
        type: 'warning',
        title,
        message,
        duration,
      })
    },

    info(title: string, message: string, duration?: number) {
      return this.addNotification({
        type: 'info',
        title,
        message,
        duration,
      })
    },
  },
})
