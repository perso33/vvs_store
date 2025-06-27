#!/bin/bash

# Script de test pour vérifier le routage SPA
echo "🧪 Test du routage SPA pour VVS Store"
echo "======================================="

# Fonction pour tester une URL
test_route() {
    local route=$1
    local description=$2
    echo "🔍 Test de la route: $route ($description)"
    
    # Utilise curl pour tester si la route retourne du HTML valide
    response=$(curl -s -w "%{http_code}" "http://localhost:4173$route" -o /tmp/test_response.html)
    
    if [ "$response" = "200" ]; then
        # Vérifie si la réponse contient du HTML Vue
        if grep -q "div id=\"app\"" /tmp/test_response.html; then
            echo "✅ $route - OK (HTML Vue détecté)"
        else
            echo "❌ $route - ERREUR (Pas de HTML Vue)"
        fi
    else
        echo "❌ $route - ERREUR (Code: $response)"
    fi
    echo ""
}

# Test des routes principales
test_route "/" "Page d'accueil"
test_route "/login" "Page de connexion"
test_route "/products" "Liste des produits"
test_route "/admin/dashboard" "Dashboard admin"
test_route "/vendor/dashboard" "Dashboard vendeur"
test_route "/some-random-route" "Route inexistante (doit retourner l'app)"

echo "🏁 Tests terminés !"
echo "💡 Si tous les tests passent, le routage SPA fonctionne correctement."
