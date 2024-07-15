'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  type: string;
  name: string;
  status: string;
  image: string;
  totalStock: number;
  totalPrice: number;
}

interface CartContextType {
  cartCount: number;
  cartItem: CartItem[];
  clearCartItem: () => void
  updateCartItem: () => void;
  removeCartItem: (index: number) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  const updateCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    const cartDetail = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItem(cartDetail);
  };
  
  const removeCartItem = (index: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItem();
  };

  const clearCartItem = () => {
    localStorage.removeItem('cart')
    setCartItem([])
    setCartCount(0)
  }

  useEffect(() => {
    updateCartItem();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, cartItem, updateCartItem, removeCartItem, clearCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
