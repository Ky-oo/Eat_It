import { defineStore } from "pinia";
import type { MenuItem } from "~~/modules/restaurant/types";

// Interface pour les éléments du panier avec quantité
export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export const useCart = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    // Retourne tous les éléments du panier avec leurs quantités
    getItems: (state): CartItem[] => {
      return state.items;
    },

    // Retourne le nombre total d'articles (en comptant les quantités)
    getTotalItems: (state): number => {
      return state.items.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
    },

    // Retourne le prix total du panier
    getTotalPrice: (state): number => {
      return state.items.reduce(
        (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
        0
      );
    },

    // Retourne la quantité d'un article spécifique
    getItemQuantity:
      (state) =>
      (itemId: number): number => {
        const cartItem = state.items.find(
          (cartItem) => cartItem.item.id === itemId
        );
        return cartItem ? cartItem.quantity : 0;
      },
  },
  actions: {
    // Ajouter un article au panier
    addItem(item: MenuItem, quantity: number = 1) {
      const existingItem = this.items.find(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItem) {
        // Si l'article existe déjà, augmenter la quantité
        existingItem.quantity += quantity;
      } else {
        // Si c'est un nouvel article, l'ajouter au panier
        this.items.push({
          item: item,
          quantity: quantity,
        });
      }
    },

    // Supprimer une unité d'un article
    removeOneItem(itemId: number) {
      const existingItem = this.items.find(
        (cartItem) => cartItem.item.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Si quantité > 1, diminuer de 1
          existingItem.quantity -= 1;
        } else {
          // Si quantité = 1, supprimer complètement l'article
          this.items = this.items.filter(
            (cartItem) => cartItem.item.id !== itemId
          );
        }
      }
    },

    // Supprimer complètement un article du panier
    removeItem(itemId: number) {
      this.items = this.items.filter((cartItem) => cartItem.item.id !== itemId);
    },

    // Mettre à jour la quantité d'un article
    updateQuantity(itemId: number, newQuantity: number) {
      if (newQuantity <= 0) {
        this.removeItem(itemId);
        return;
      }

      const existingItem = this.items.find(
        (cartItem) => cartItem.item.id === itemId
      );
      if (existingItem) {
        existingItem.quantity = newQuantity;
      }
    },

    // Vider le panier
    clearCart() {
      this.items = [];
    },
  },
});
