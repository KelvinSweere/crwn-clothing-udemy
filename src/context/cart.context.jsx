import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  
  if(existingCartItem.quantity === 1) 
  {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const getNewCartTotal = (cartItems) => {
    return cartItems.map((item) => 
    item.quantity * item.price
  ).reduce((partialSum, a) => partialSum + a, 0);
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  removeItemToCart: () => {},
  clearItemToCart: () => {},
  cartTotal: 0,
  setCartTotal: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal ] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
    
    const newCartTotal = getNewCartTotal(cartItems);
    setCartTotal(newCartTotal);

  }, [cartItems])

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemToCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const clearItemToCart = (cartItemToRemove) => 
    setCartItems(clearCartItem(cartItems, cartItemToRemove));

  const value = { isCartOpen, setIsOpen, cartItems, addItemToCart, cartCount, removeItemToCart,  clearItemToCart, cartTotal};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};