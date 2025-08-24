import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Crear contexto
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const totalAmount = cart.reduce((sum, g) => sum + (g.priceWithSale ?? g.price ?? 0), 0);

  // Guardar siempre que cart cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Verifica si un juego está en el carrito
  const isInCart = useCallback(
    (gameId) => cart.some((g) => g?.id === gameId),
    [cart]
    );

  // Agrega un juego al carrito
  const addItem = useCallback(
    (game) => {
      setCart((prev) => {
        if (prev.some((g) => g.id === game.id)) return prev;
        return [...prev, game];
      });
    },
    []
  );

  // Elimina un juego del carrito
  const removeItem = useCallback(
    (game) => {
      setCart((prev) => prev.filter((g) => g.id !== game.id));
    },
    []
  );

  // Alterna agregar/quitar un juego
  const toggleCartItem = useCallback(
    (game) => {
      setCart((prev) => {
        const exists = prev.some((g) => g.id === game.id);
        if (exists) return prev.filter((g) => g.id !== game.id);
        return [...prev, game];
      });
    },
    []
  );

  // Vaciar carrito
  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider
      value={{ cart, totalAmount, isInCart, addItem, removeItem, toggleCartItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir contexto
export const useCartContext = () => useContext(CartContext);
