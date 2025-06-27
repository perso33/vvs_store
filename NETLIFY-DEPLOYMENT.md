# Déploiement Netlify - VVS Store

## Configuration SPA pour Netlify

Ce projet est configuré pour fonctionner parfaitement sur Netlify avec un routage SPA (Single Page Application). Voici les fichiers de configuration essentiels :

### 1. `public/_redirects`
```
# Netlify redirects file for Vue.js SPA
# This ensures that all routes are handled by Vue Router

# API routes (if you have backend endpoints)
/api/*  /api/:splat  200

# Handle all other routes by redirecting to index.html
/*    /index.html   200
```

### 2. `netlify.toml`
Contient la configuration de build et les redirections pour Netlify.

### 3. Commande de build
```bash
npm run build:netlify
```

## Résolution des problèmes

### Page blanche lors de l'actualisation
Si vous obtenez une page blanche lors de l'actualisation sur Netlify :

1. **Vérifiez les redirections** : Assurez-vous que le fichier `public/_redirects` est présent et correct
2. **Vérifiez netlify.toml** : La configuration doit pointer vers le bon dossier de publication (`dist`)
3. **Vérifiez la base URL** : Dans `vite.config.ts`, assurez-vous que `base: '/'` est défini

### Test local
Avant de déployer, testez localement :
```bash
npm run build:netlify
npm run preview
```

Puis testez différentes routes directement dans le navigateur.

## Variables d'environnement Netlify

Dans l'interface Netlify, ajoutez ces variables d'environnement :

- `VITE_BASE_URL` = `/`
- `VITE_APP_TITLE` = `VVS Store - Lubumbashi`
- `VITE_ENABLE_ADS` = `true`

## Commandes utiles

```bash
# Build pour Netlify
npm run build:netlify

# Test local du build
npm run preview

# Test du routage SPA
./test-spa.sh
```

## Dépannage avancé

Si le problème persiste :

1. Vérifiez les logs de build Netlify
2. Assurez-vous que tous les fichiers sont dans le dossier `dist`
3. Vérifiez que l'index.html contient l'élément `<div id="app">`
4. Testez avec le navigateur en mode incognito

La configuration actuelle garantit que :
- ✅ Toutes les routes retournent l'application Vue
- ✅ L'actualisation fonctionne sur toutes les pages
- ✅ Les liens directs fonctionnent
- ✅ Le routage Vue Router est préservé
