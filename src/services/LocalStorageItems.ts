import { toast } from "sonner";
import { useItemsContext } from "../hooks/useItemsContext";

const LOCAL_STORAGE_KEY = "guestItems";
interface LocalStorageItem {
  id: string;
  userId: string;
  title: string;
}

export function LocalStorageItems() {
  const { addItems, attendItem } = useItemsContext();
  // Obtener tareas desde localStorage
  const getLocalStorageItems = (): LocalStorageItem[] => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedItems = items ? JSON.parse(items) : [];
    addItems(parsedItems);
    return parsedItems;
  };

  // Guardar tareas en localStorage
  const saveLocalStorageItem = (items: LocalStorageItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  };

  // Agregar una tarea a localStorage
  const addLocalStorageItem = ({ itemTitle }: { itemTitle: string }) => {
    const items = getLocalStorageItems();
    items.push({
      id: crypto.randomUUID(),
      userId: "guesUser",
      title: itemTitle,
    });
    saveLocalStorageItem(items);
    addItems(items);
    toast.success("Item created 🎉");
  };

  // Eliminar la primera tarea (FIFO)
  const removeLocalStorageItem = () => {
    const items = getLocalStorageItems();
    items.shift();
    attendItem();
    saveLocalStorageItem(items);
    toast.error("Item deleted 😔");
  };

  return {
    getLocalStorageItems,
    addLocalStorageItem,
    saveLocalStorageItem,
    removeLocalStorageItem,
  };
}
