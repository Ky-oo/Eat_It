# Eat It 🍕

Application moderne de livraison de nourriture — construite avec **Nuxt 4**, **Vue 3**, **TypeScript**, **TailwindCSS**, **Pinia**, **i18n**, **PWA**, **Playwright**, et **Google Auth**.

---

## 🚀 Démo

[Eat-It](https://eat-it-wine.vercel.app)

---

# ✨ Fonctionnalités principales

### 🍽️ Restaurants & menus

- Page liste restaurants (SSR)
- Page détail restaurant
- Menus dynamiques
- Recherche et filtres

### 🛒 Panier complet

- Ajout / modification / suppression
- Total dynamique
- Store Pinia persistant

### 👤 Authentification complète

- Email + mot de passe
- **Connexion Google (OAuth2)**
- Sessions sécurisées côté client

### 🌍 Internationalisation FR / EN

- Traductions complètes via i18n
- Changement de langue dans la navbar

### 📱 Progressive Web App (PWA)

- Service Worker
- Manifest complet
- Mode offline
- Installable mobile & desktop

### 🧪 Tests

- Tests unitaires (Vitest)
- Tests E2E (Playwright)
- Pipeline CI/CD complet

---

# 🏗️ Architecture du projet

```
eat_it/
│── app/
│   ├── components/      # UI (atoms, molecules, organisms)
│   ├── pages/           # Routing automatique Nuxt
│   ├── stores/          # Pinia stores (Auth, Cart…)
│   ├── middleware/      # Auth / Guest guards
│   ├── types/           # Types TS centralisés
│   └── layouts/
│
│── server/
│   └── api/             # Endpoints backend (auth, restaurants…)
│
│── i18n/
│   ├── en.json
│   └── fr.json
│
│── public/              # Images, icons, manifest, offline page
│── nuxt.config.ts       # Configuration principale Nuxt
│── test/                # Tests unitaires + E2E
│── README.md
```

---

# 🔐 Fonctionnement de l’authentification Google

L’application utilise **Google Identity Services (OAuth2)** via :

- `vue3-google-signin` côté **client**
- Des endpoints personnalisés côté **serveur Nuxt**

---

## 1️⃣ Initialisation Google côté client

```ts
import { useCodeClient } from "vue3-google-signin";

const { isReady, login } = useCodeClient({
  client_id: "<GOOGLE_CLIENT_ID>",
  callback: handleSuccess,
});
```

---

## 2️⃣ Envoi du code OAuth au backend

```ts
const res = await $fetch("/api/auth/google", {
  method: "POST",
  body: { code: response.code },
});
```

---

## 3️⃣ Le serveur contacte Google

- Échange du **code OAuth** contre des tokens
- Récupération du profil utilisateur
- Création utilisateur si nécessaire

---

## 4️⃣ Réponse backend

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "user": {
    "id": "...",
    "email": "example@gmail.com",
    "name": "John Doe",
    "picture": "..."
  }
}
```

---

## 5️⃣ Stockage de la session (Pinia)

- Mise à jour du store Auth
- Persistance des tokens
- Mise à jour de la navbar

---

# ⚙️ Installation & scripts

## 📦 Installation

```bash
npm install
```

## ▶️ Développement

```bash
npm dev
```

## 🔨 Build

```bash
npm build
npm preview
```

---

# 🧪 Tests

## Unitaires (Vitest)

```bash
npm test:unit
```

## E2E (Playwright)

Je vous conseille de faire tout d'abord un

```bash
npm run build
```

puis

```bash
npm run preview
```

pour efféctuer les tests dans les meilleurs conditions

```bash
npm test:e2e
```

---

# 🔄 CI/CD

Pipeline disponible dans `.github/workflows/deploy.yaml`.

- Tests
- Build
- Déploiement
- Badge affiché dans README

---

# 🌐 Variables d'environnement

Créer un fichier `.env` :

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NUXT_API_BASE_URL=...
```

---

# 📱 PWA

- Manifest
- Service Worker
- Offline
- Installable

---

# 🤝 Contribution

PR et issues bienvenues.

---

# 📄 Licence

MIT
