import { useState } from "react";
import { Item, ItemsContext } from "./ItemsContext";

export default function ItemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Item[]>([]);

  const addOneItem = (item: Item) => {
    setItems((prevItems) => {
      // Comprobar si el item ya existe en el estado
      if (!prevItems.some((prevItem) => prevItem.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const addItems = (newItems: Item[]) => {
    setItems((prevItems) => {
      // Filtrar elementos duplicados antes de agregarlos
      const filteredItems = newItems.filter(
        (newItem) => !prevItems.some((prevItem) => prevItem.id === newItem.id),
      );
      return [...prevItems, ...filteredItems];
    });
  };

  const deleteItem = (itemId: string) => {
    setItems((prevItems) => {
      const filteredItems = prevItems.filter((items) => items.id !== itemId);
      return filteredItems;
    });
  };

  const attendItem = () => {
    setItems((prevItems) => {
      return prevItems.slice(1);
    });
  };

  return (
    <ItemsContext.Provider
      value={{ items, addOneItem, addItems, deleteItem, attendItem }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
