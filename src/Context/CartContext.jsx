import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
}from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [cart, setCart] = useState([]);

  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchCart = async () => {
      if (!authUser) {
        setCart([]);
        return;
      }

      const res = await axios.get(
        `${BASE_URL}/cart?userId=${authUser.id}`
      );
      setCart(res.data);
    };

    fetchCart();
  }, [authUser]);

  const addToCart = async (product, quantity = 1) => {
    if (!authUser) return alert("Login first");

    const existing = cart.find(
      (item) => item.productId === product.id
    );

    if (existing) {
      const newQty = existing.quantity + quantity;

      await axios.patch(
        `${BASE_URL}/cart/${existing.id}`,
        { quantity: newQty }
      );

      setCart((prev) =>
        prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } else {
      const newItem = {
        userId: authUser.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      };

      const res = await axios.post(
        `${BASE_URL}/cart`,
        newItem
      );

      setCart((prev) => [...prev, res.data]);
    }
  };

  const removeFromCart = async (id) => {
    await axios.delete(`${BASE_URL}/cart/${id}`);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    await axios.patch(`${BASE_URL}/cart/${id}`, {
      quantity: qty,
    });

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = async () => {
    await Promise.all(
      cart.map((item) =>
        axios.delete(`${BASE_URL}/cart/${item.id}`)
      )
    );
    setCart([]);
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);