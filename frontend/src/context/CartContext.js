import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
const WishlistContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems]       = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [page, setPage]                 = useState('home'); // 'home' | 'cart' | 'checkout'

  // ── Cart ──
  function addToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, delta) {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }

  function clearCart() { setCartItems([]); }

  const cartCount   = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal   = cartItems.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);

  // ── Wishlist ──
  function toggleWishlist(product) {
    setWishlistItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }

  function isWishlisted(id) {
    return wishlistItems.some(i => i.id === id);
  }

  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, cartTotal, page, setPage
    }}>
      <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted, wishlistCount }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart()     { return useContext(CartContext); }
export function useWishlist() { return useContext(WishlistContext); }
