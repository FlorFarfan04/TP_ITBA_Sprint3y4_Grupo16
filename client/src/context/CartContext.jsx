import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(producto) {
    const id = producto._id || producto.id;
    setItems((actuales) => {
      const existente = actuales.find((item) => item.producto._id === id);
      if (existente) {
        return actuales.map((item) => item.producto._id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item);
      }
      return [...actuales, { producto: { ...producto, _id: id }, cantidad: 1 }];
    });
  }

  function removeItem(id) {
    setItems((actuales) => actuales.filter((item) => item.producto._id !== id));
  }

  function setQuantity(id, cantidad) {
    if (cantidad < 1) return removeItem(id);
    setItems((actuales) => actuales.map((item) => item.producto._id === id ? { ...item, cantidad } : item));
  }

  function clearCart() { setItems([]); }

  const value = useMemo(() => ({
    items,
    cantidad: items.reduce((total, item) => total + item.cantidad, 0),
    total: items.reduce((sum, item) => sum + Number(item.producto.precio) * item.cantidad, 0),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
