import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  //   if (!context) {
  //     throw new Error(`useAuth must be used within a AuthProvider`);
  //   }
  return context;
};

export default useCart;
