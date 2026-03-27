import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart!`, {
      style: {
        borderRadius: '16px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, amount) => {
    setCart((prevCart) => prevCart.map((i) => {
      if (i.id === itemId) {
        const newQty = Math.max(1, i.quantity + amount);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, '');
    return total + (parseInt(priceStr) * item.quantity);
  }, 0);

  const checkout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue checkout');
      return false;
    }

    try {
      // For simplicity, we loop through cart items and create individual rentals
      // In a real app, a single bulk booking endpoint would be better
      for (const item of cart) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7); // Default 1 week

        const response = await fetch('http://localhost:5000/api/rent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            itemId: item.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Failed to rent ${item.name}`);
        }

      }

      setCart([]);
      toast.success('Your rental order has been placed successfully!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Checkout failed');
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
