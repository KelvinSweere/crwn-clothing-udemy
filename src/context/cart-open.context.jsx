import { createContext, useState } from "react";

export const OpenCartContext = createContext({
  isCartOpen: false,
  setIsCardOpen: () => {}
});

export const OpenCartProvider = ({ children }) => {
  const [isCartOpen, setIsCardOpen] = useState(false);
  const value = { isCartOpen, setIsCardOpen }
  return <OpenCartContext.Provider value={value}>{children}</OpenCartContext.Provider>
};