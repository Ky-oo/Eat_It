# Guide de développement - Eat It

## 🛠️ Configuration de l'environnement de développement

### Prérequis

- Node.js 18+
- npm, yarn, pnpm ou bun
- VS Code (recommandé)

### Extensions VS Code recommandées

- Volar (Vue Language Features)
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### Démarrage rapide

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

## 🏗️ Architecture du projet

### Structure des dossiers

```
eat_it/
├── app/
│   ├── components/          # Composants organisés selon Atomic Design
│   │   ├── atoms/          # Composants de base
│   │   ├── molecules/      # Combinaisons d'atomes
│   │   ├── organisms/      # Sections complexes
│   │   └── templates/      # Structures de page
│   ├── layouts/            # Layouts Nuxt
│   ├── pages/              # Pages Nuxt (routes automatiques)
│   ├── stores/             # Stores Pinia
│   └── types/              # Types TypeScript globaux
├── modules/                # Modules métier
│   └── restaurant/         # Module restaurant avec ses types
├── public/                 # Assets statiques
│   └── logos/              # Logos et images du site
├── server/                 # API Nuxt/Nitro
│   ├── api/                # Endpoints API
│   └── data/               # Données JSON
└── docs/                   # Documentation
```

## 📋 Conventions de code

### Composants Vue

```vue
<template>
  <!-- Template avec classes Tailwind -->
</template>

<script setup lang="ts">
// Import des types et composants
import type { MyType } from "~/types/MyType";

// Props et émissions avec types
interface Props {
  item: MyType;
}

interface Emits {
  action: [value: string];
}

defineProps<Props>();
defineEmits<Emits>();

// Logique du composant
</script>
```

### Nommage

- **Composants** : PascalCase (`RestaurantCard.vue`)
- **Types** : PascalCase (`MenuItem.ts`)
- **Variables** : camelCase (`restaurantId`)
- **Constants** : SCREAMING_SNAKE_CASE (`API_BASE_URL`)

### Imports

```typescript
// Types
import type { MenuItem } from "~~/modules/restaurant/types";

// Composants (auto-importés par Nuxt)
// Pas besoin d'import explicite pour les composants

// Stores
import { useCart } from "~/stores/Cart";

// Utils
import { formatPrice } from "~/utils/format";
```

## 🎨 Design System

### Couleurs

```css
/* Palette principale */
primary: '#F97316',      /* Orange */
secondary: '#6B7280',    /* Gris */
background: '#F9FAFB',   /* Gris clair */
white: '#FFFFFF',        /* Blanc */

/* États */
success: '#10B981',      /* Vert */
warning: '#F59E0B',      /* Jaune */
error: '#EF4444',        /* Rouge */
```

### Spacing

Utiliser les classes Tailwind standard :

- `p-4`, `m-6`, `gap-2`, etc.
- Éviter les valeurs arbitraires sauf cas spéciaux

### Typography

```css
/* Hiérarchie des titres */
h1: text-4xl font-bold
h2: text-3xl font-bold
h3: text-2xl font-bold
h4: text-xl font-semibold

/* Corps de texte */
body: text-base
small: text-sm
```

## 🧩 Création de nouveaux composants

### 1. Déterminer le niveau atomique

**Atome** → Composant de base réutilisable

```vue
<!-- atoms/Button.vue -->
<template>
  <button :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>
```

**Molécule** → Combinaison d'atomes

```vue
<!-- molecules/SearchInput.vue -->
<template>
  <div class="relative">
    <Input v-model="value" :placeholder="placeholder" />
    <SearchIcon class="absolute right-3 top-3" />
  </div>
</template>
```

**Organisme** → Section complexe

```vue
<!-- organisms/RestaurantList.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <RestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>
```

### 2. Checklist avant création

- [ ] Le composant a-t-il une responsabilité unique ?
- [ ] Respecte-t-il la hiérarchie atomique ?
- [ ] Les props sont-elles typées ?
- [ ] Les émissions sont-elles définies ?
- [ ] Le nommage suit-il les conventions ?

## 📡 Gestion d'état

### Store Pinia

```typescript
// stores/MyStore.ts
export const useMyStore = defineStore("my-store", () => {
  // État
  const items = ref<Item[]>([]);

  // Getters
  const itemCount = computed(() => items.value.length);

  // Actions
  const addItem = (item: Item) => {
    items.value.push(item);
  };

  return { items, itemCount, addItem };
});
```

### Utilisation dans un composant

```vue
<script setup lang="ts">
import { useMyStore } from "~/stores/MyStore";

const store = useMyStore();

// Accès réactif
const { items, itemCount } = storeToRefs(store);

// Actions
const handleAdd = () => {
  store.addItem(newItem);
};
</script>
```

## 🛣️ Routing et navigation

### Pages automatiques

```
pages/
├── index.vue                    → /
├── about.vue                    → /about
├── restaurants/
│   ├── index.vue               → /restaurants
│   └── [id].vue                → /restaurants/:id
└── user/
    └── [slug]/
        └── settings.vue        → /user/:slug/settings
```

### Navigation

```vue
<template>
  <!-- Navigation déclarative -->
  <NuxtLink to="/restaurants" class="nav-link"> Restaurants </NuxtLink>

  <!-- Navigation programmatique -->
  <button @click="navigateToRestaurant(restaurant.id)">
    Voir le restaurant
  </button>
</template>

<script setup lang="ts">
const navigateToRestaurant = (id: string) => {
  return navigateTo(`/restaurants/${id}`);
};
</script>
```

## 🔧 Debugging et outils

### DevTools

- **Vue DevTools** : Inspection des composants et stores
- **Nuxt DevTools** : Panel de développement intégré (Shift + Alt + D)
- **Network Tab** : Monitoring des requêtes API

### Logging

```typescript
// En développement uniquement
if (process.dev) {
  console.log("Debug info:", data);
}

// Utiliser des outils de debug appropriés
console.group("Restaurant Loading");
console.log("ID:", restaurantId);
console.log("Data:", restaurantData);
console.groupEnd();
```

## 🧪 Tests

### Structure des tests

```
tests/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── stores/
└── utils/
```

### Exemple de test de composant

```typescript
// tests/components/atoms/Button.test.ts
import { mount } from "@vue/test-utils";
import Button from "~/components/atoms/Button.vue";

describe("Button", () => {
  it("renders correctly", () => {
    const wrapper = mount(Button, {
      slots: { default: "Click me" },
    });

    expect(wrapper.text()).toBe("Click me");
  });
});
```

## 📝 Documentation

### Commentaires de composants

```vue
<script setup lang="ts">
/**
 * Composant de carte de restaurant
 * Affiche les informations principales d'un restaurant avec actions
 *
 * @component RestaurantCard
 * @example
 * <RestaurantCard
 *   :restaurant="restaurant"
 *   @click="handleClick"
 * />
 */

interface Props {
  /** Données du restaurant à afficher */
  restaurant: Restaurant;
  /** Mode d'affichage compact */
  compact?: boolean;
}
</script>
```

### Types documentés

```typescript
/**
 * Représente un article du menu d'un restaurant
 */
export interface MenuItem {
  /** Identifiant unique de l'article */
  id: string;
  /** Nom de l'article */
  name: string;
  /** Description détaillée */
  description: string;
  /** Prix en euros */
  price: number;
  /** URL de l'image */
  image: string;
  /** Catégorie (entrée, plat, dessert, etc.) */
  category: string;
}
```

## 🚀 Déploiement

### Build de production

```bash
# Construire l'application
npm run build

# Prévisualiser la build
npm run preview
```

### Variables d'environnement

```env
# .env
NUXT_API_BASE_URL=https://api.example.com
NUXT_PUBLIC_SITE_URL=https://example.com
```

## 📚 Ressources

### Documentation officielle

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)

### Guides spécifiques au projet

- [Architecture Atomique](./ATOMIC_DESIGN.md)
- [README principal](../README.md)
