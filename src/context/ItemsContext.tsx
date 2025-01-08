import { createContext } from "react";

export interface Item {
  id: string;
  userId: string;
  title: string;
}

export interface ItemContextType {
  items: Item[] | null;
  addItems: (items: Item[]) => void;
  addOneItem: (item: Item) => void;
  deleteItem: (itemId: string) => void;
  attendItem: () => void;
}

export const ItemsContext = createContext<ItemContextType | null>(null);
