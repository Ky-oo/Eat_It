// @vitest-environment node
import test from "node:test";
import { it, expect, beforeEach } from "vitest";
import { useCart } from "../../app/stores/Cart";
import { setActivePinia, createPinia } from "pinia";

test.describe("Cart Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should return cart items", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };
    cartStore.addItem(menuItem);
    expect(cartStore.getItems).toStrictEqual([
      { item: { id: "1", name: "Burger", price: 5.99 }, quantity: 1 },
    ]);
  });

  it("should return cart items quantity", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };
    cartStore.addItem(menuItem);
    expect(cartStore.getTotalItems).toBe(1);
  });

  it("should return cart items quantity - Multiple items", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    expect(cartStore.getTotalItems).toBe(3);
  });

  it("should return cart items total price - Multiple items", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    expect(cartStore.getTotalPrice).toBe(17.97);
  });

  it("should return cart item quantity - Multiple items", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    cartStore.addItem(menuItem);
    expect(cartStore.getItemQuantity("1")).toBe(3);
  });

  it("should add item to cart", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };

    cartStore.addItem(menuItem, 2);

    expect(cartStore.getItemQuantity(menuItem.id)).toBe(2);
  });

  it("should remove item from cart", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };

    cartStore.addItem(menuItem, 2);
    cartStore.removeItem(menuItem.id);

    expect(cartStore.getItemQuantity(menuItem.id)).toBe(0);
  });

  it("should remove one item from cart", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };

    cartStore.addItem(menuItem, 2);
    cartStore.removeOneItem(menuItem.id);

    expect(cartStore.getItemQuantity(menuItem.id)).toBe(1);
  });

  it("should update item quantity from cart", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };

    cartStore.addItem(menuItem, 2);
    cartStore.updateQuantity(menuItem.id, 5);

    expect(cartStore.getItemQuantity(menuItem.id)).toBe(5);
  });

  it("should clear cart", () => {
    const cartStore = useCart();
    const menuItem = { id: "1", name: "Burger", price: 5.99 };

    cartStore.addItem(menuItem, 2);
    cartStore.clearCart();

    expect(cartStore.getItems).toStrictEqual([]);
  });
});
