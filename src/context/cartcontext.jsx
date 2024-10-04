import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find(item => item.id === pizza.id);
      if (existingPizza) {
        return prevCart.map(item =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((pizza) => pizza.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((pizza) =>
        pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((pizza) =>
        pizza.id === id && pizza.quantity > 1
          ? { ...pizza, quantity: pizza.quantity - 1 }
          : pizza
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0);
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
