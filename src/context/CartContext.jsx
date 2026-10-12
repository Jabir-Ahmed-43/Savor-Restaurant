"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

const getItemId = (item) => {
  if (!item) return "";
  return String(item._id || item.id || "");
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("savor_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage on updates after initialization
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("savor_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item) => {
    if (!item) return;
    const targetId = getItemId(item);
    if (!targetId) return;

    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (cartItem) => getItemId(cartItem) === targetId
      );

      if (existingIndex > -1) {
        return prevCart.map((cartItem, idx) =>
          idx === existingIndex
            ? { ...cartItem, quantity: (Number(cartItem.quantity) || 1) + 1 }
            : cartItem
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          _id: item._id ? String(item._id) : targetId,
          id: item.id ? String(item.id) : targetId,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    const targetId = String(itemId || "");
    if (!targetId) return;

    if (newQuantity < 1) {
      removeFromCart(targetId);
      return;
    }

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        getItemId(item) === targetId
          ? { ...item, quantity: Number(newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    const targetId = String(itemId || "");
    if (!targetId) return;

    setCartItems((prevCart) =>
      prevCart.filter((item) => getItemId(item) !== targetId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
