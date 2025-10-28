import { defineStore } from "pinia";
import type { MenuItem } from "~~/app/types/Restaurant";
import type { CartItem } from "~~/app/types/CartItem";

export const useCart = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    getItems: (state): CartItem[] => {
      return state.items;
    },

    getTotalItems: (state): number => {
      return state.items.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
    },

    getTotalPrice: (state): number => {
      return state.items.reduce(
        (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
        0
      );
    },

    getItemQuantity:
      (state) =>
      (itemId: string): number => {
        const cartItem = state.items.find(
          (cartItem) => cartItem.item.id === itemId
        );
        return cartItem ? cartItem.quantity : 0;
      },
  },
  actions: {
    addItem(item: MenuItem, quantity: number = 1) {
      const existingItem = this.items.find(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          item: item,
          quantity: quantity,
        });
      }
    },

    removeOneItem(itemId: string) {
      const existingItem = this.items.find(
        (cartItem) => cartItem.item.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          this.items = this.items.filter(
            (cartItem) => cartItem.item.id !== itemId
          );
        }
      }
    },

    removeItem(itemId: string) {
      this.items = this.items.filter((cartItem) => cartItem.item.id !== itemId);
    },

    updateQuantity(itemId: string, newQuantity: number) {
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

    clearCart() {
      this.items = [];
    },
  },
});
