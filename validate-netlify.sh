#!/bin/bash

# Script de validation pour Netlify
echo "🚀 Validation de la configuration Netlify"
echo "========================================="

# Vérification des fichiers essentiels
echo "📁 Vérification des fichiers de configuration..."

files_to_check=(
    "public/_redirects"
    "netlify.toml"
    "dist/index.html"
    "dist/_redirects"
    ".env.production"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Présent"
    else
        echo "❌ $file - MANQUANT"
    fi
done

echo ""
echo "📋 Contenu du fichier _redirects dans dist:"
cat dist/_redirects

echo ""
echo "🔧 Configuration netlify.toml:"
head -15 netlify.toml

echo ""
echo "✨ Résumé de la configuration:"
echo "• Build command: npm run build:netlify"
echo "• Publish directory: dist"
echo "• SPA redirect: /* -> /index.html (200)"
echo "• Base URL: /"

echo ""
echo "🎯 Pour déployer sur Netlify:"
echo "1. Connectez votre repo GitHub à Netlify"
echo "2. Configurez les variables d'environnement si nécessaire"
echo "3. Le build se lancera automatiquement"
echo "4. Testez l'actualisation sur différentes routes"

echo ""
echo "🔍 Si vous avez encore des pages blanches:"
echo "• Vérifiez les logs de build Netlify"
echo "• Assurez-vous que la base URL est '/'"
echo "• Vérifiez que tous les assets sont chargés correctement"
