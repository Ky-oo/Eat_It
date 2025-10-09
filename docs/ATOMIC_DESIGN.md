# Architecture Atomique - Eat It

Ce document décrit l'organisation des composants selon les principes de l'**Atomic Design**.

## 🏗️ Structure

```
app/components/
├── atoms/           # Éléments de base
├── molecules/       # Combinaisons d'atomes
├── organisms/       # Groupes de molécules
└── templates/       # Structures de page
```

## 🔬 Atoms (Atomes)

Les **atomes** sont les plus petites unités de l'interface utilisateur. Ils ne peuvent pas être décomposés davantage sans perdre leur utilité.

### Composants actuels :

- `PageTitle.vue` - Titre de page standardisé
- `NoRestaurants.vue` - Message d'état vide
- `icons/PlusIcon.vue` - Icône d'ajout
- `icons/MinusIcon.vue` - Icône de soustraction

### Caractéristiques :

- **Autonomes** : Fonctionnent indépendamment
- **Réutilisables** : Utilisés dans plusieurs contextes
- **Simples** : Une seule responsabilité
- **Sans état complexe** : Props simples uniquement

### Exemple d'usage :

```vue
<PageTitle>Liste des restaurants</PageTitle>
<PlusIcon size="w-4 h-4" />
```

## 🧬 Molecules (Molécules)

Les **molécules** combinent plusieurs atomes pour créer des unités fonctionnelles plus complexes.

### Composants actuels :

- `QuantitySelector.vue` - Sélecteur de quantité (utilise PlusIcon + MinusIcon)
- `PopularSearchChips.vue` - Puces de recherche populaire
- `RestaurantDescription.vue` - Description détaillée de restaurant

### Caractéristiques :

- **Composées d'atomes** : Utilisent des composants atomiques
- **Fonctionnalité spécifique** : Ont un but précis
- **État simple** : Gèrent un état local limité
- **Réutilisables** : Utilisées dans plusieurs organismes

### Exemple d'usage :

```vue
<QuantitySelector
  :quantity="quantity"
  @increase="handleIncrease"
  @decrease="handleDecrease"
/>
```

## 🦠 Organisms (Organismes)

Les **organismes** sont des groupes de molécules qui forment des sections complexes et distinctes de l'interface.

### Composants actuels :

- `ItemCard.vue` - Carte d'article de menu
- `RestaurantCard.vue` - Carte de restaurant
- `MenuItemModal.vue` - Modal de détail d'article
- `RestaurantGrid.vue` - Grille de restaurants
- `RestaurantMenu.vue` - Menu de restaurant complet
- `FloatingCart.vue` - Panier flottant
- `HeroRestaurant.vue` - En-tête de restaurant
- `RestaurantSearchBar.vue` - Barre de recherche
- `PopularSearches.vue` - Section recherches populaires

### Caractéristiques :

- **Sections complètes** : Parties distinctes de l'interface
- **État complexe** : Gèrent des données et interactions
- **Composées de molécules et atomes** : Utilisent les niveaux inférieurs
- **Spécifiques au contexte** : Adaptées au domaine métier

### Exemple d'usage :

```vue
<RestaurantCard :restaurant="restaurant" @click="navigateToRestaurant" />
```

## 📄 Templates

Les **templates** définissent la structure générale des pages en combinant des organismes.

### Composants actuels :

- `PageLayout.vue` - Template de page principale avec header, footer et panier

### Caractéristiques :

- **Structure de page** : Définissent la mise en page globale
- **Placeholders** : Utilisent des slots pour le contenu variable
- **Responsive** : Gèrent les différentes tailles d'écran
- **Réutilisables** : Utilisées par plusieurs pages

## 🎯 Bonnes pratiques

### 1. Dépendances hiérarchiques

- Les **atomes** ne dépendent de rien
- Les **molécules** utilisent uniquement des atomes
- Les **organismes** utilisent molécules et atomes
- Les **templates** utilisent tous les niveaux

### 2. Nommage

- **Atomes** : Noms génériques (`Button`, `Icon`, `Title`)
- **Molécules** : Noms fonctionnels (`QuantitySelector`, `SearchBar`)
- **Organismes** : Noms métier (`RestaurantCard`, `MenuModal`)
- **Templates** : Noms de structure (`PageLayout`, `GridLayout`)

### 3. État et logique

- **Atomes** : Aucun état, props simples
- **Molécules** : État local minimal
- **Organismes** : État complexe, logique métier
- **Templates** : Structure uniquement

### 4. Tests

Chaque niveau peut être testé indépendamment :

- **Atomes** : Tests unitaires simples
- **Molécules** : Tests d'interaction
- **Organismes** : Tests de comportement
- **Templates** : Tests de structure

## 🔄 Évolution

### Ajout de nouveaux composants

1. **Identifier le niveau** : Déterminer si c'est un atome, molécule, organisme ou template
2. **Vérifier les dépendances** : S'assurer de respecter la hiérarchie
3. **Nommer correctement** : Suivre les conventions de nommage
4. **Documenter** : Ajouter à cette documentation

### Refactoring

- Si un organisme devient trop complexe → créer de nouvelles molécules
- Si du code se répète → extraire en atomes réutilisables
- Si une molécule n'est utilisée qu'une fois → potentiellement la fusionner

## 🚀 Avantages de cette architecture

- **Réutilisabilité** : Composants réutilisables à tous les niveaux
- **Maintenabilité** : Structure claire et logique
- **Évolutivité** : Facilite l'ajout de nouvelles fonctionnalités
- **Cohérence** : Design system uniforme
- **Testabilité** : Tests ciblés par niveau
- **Documentation** : Architecture auto-documentée
