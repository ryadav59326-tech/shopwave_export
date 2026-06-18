import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const AppContext = createContext();

// Cart reducer handles all cart operations
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        item => item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (existing) {
        return state.map(item =>
          item.id === existing.id &&
          item.selectedSize === existing.selectedSize &&
          item.selectedColor === existing.selectedColor
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(item =>
        !(item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor)
      );
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
    case 'CLEAR_CART':
      return [];
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [wishlist, dispatchWishlist] = useReducer(wishlistReducer, []);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted data from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopwave_cart');
      if (savedCart) dispatchCart({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });

      const savedWishlist = localStorage.getItem('shopwave_wishlist');
      if (savedWishlist) dispatchWishlist({ type: 'LOAD', payload: JSON.parse(savedWishlist) });

      const savedDark = localStorage.getItem('shopwave_dark');
      if (savedDark) setDarkMode(JSON.parse(savedDark));
    } catch (e) { /* ignore */ }

    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('shopwave_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('shopwave_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Apply/remove dark class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('shopwave_dark', JSON.stringify(darkMode));
  }, [darkMode]);

  // Cart helper functions
  const addToCart = (product) => {
    dispatchCart({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    dispatchCart({ type: 'REMOVE_ITEM', payload: { id, selectedSize, selectedColor } });
  };

  const updateQuantity = (id, selectedSize, selectedColor, quantity) => {
    dispatchCart({ type: 'UPDATE_QUANTITY', payload: { id, selectedSize, selectedColor, quantity } });
  };

  const clearCart = () => dispatchCart({ type: 'CLEAR_CART' });

  const toggleWishlist = (productId) => {
    dispatchWishlist({ type: 'TOGGLE', payload: productId });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const isInCart = (id) => cart.some(item => item.id === id);

  // Computed values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal, isInCart,
      wishlist, toggleWishlist, isInWishlist,
      darkMode, setDarkMode,
      isLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
