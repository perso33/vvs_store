<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Page introuvable</h2>
        <p class="text-gray-600 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
      </div>
      
      <div class="space-y-4">
        <RouterLink
          to="/"
          class="btn-primary w-full"
        >
          Retour à l'accueil
        </RouterLink>
        <button
          @click="$router.back()"
          class="btn-outline w-full"
        >
          Page précédente
        </button>
      </div>
    </div>
  </div>
</template>
