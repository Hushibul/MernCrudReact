import { createContext, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const values = {
    cartProducts,
    setCartProducts,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;
