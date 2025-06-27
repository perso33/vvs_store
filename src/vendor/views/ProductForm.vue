<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ $route.params.id ? 'Modifier le produit' : 'Nouveau produit' }}
        </h1>
        <p class="text-gray-600 mt-2">
          {{ $route.params.id ? 'Modifiez les informations de votre produit' : 'Ajoutez un nouveau produit à votre boutique' }}
        </p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-center text-gray-500">
          Formulaire de produit en cours de développement...
        </p>
        <div class="mt-4 text-center">
          <RouterLink to="/vendor/products" class="btn-outline">
            Retour aux produits
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
