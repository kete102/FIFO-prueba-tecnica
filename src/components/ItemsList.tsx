import { getAuth } from "firebase/auth";
import type { Item } from "../context/ItemsContext";
import { useItemsContext } from "../hooks/useItemsContext";
import { ItemsService } from "../services/Items";
import { CloseIcon } from "./icons";
import { LocalStorageItems } from "../services/LocalStorageItems";

function ItemsList() {
  const { items } = useItemsContext();

  if (items?.length === 0 || !items) {
    return (
      <div className="w-full h-full grid place-content-center">
        <p className="text-white font-semibold text-xl text-zinc-500 ">
          No items yet, add new items
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 ">
      {items.map((item: Item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
}

function Item({ item }: { item: Item }) {
  const auth = getAuth();
  const { DeleteItem } = ItemsService();
  const { removeLocalStorageItem } = LocalStorageItems();
  const handleItemDelete = () => {
    if (auth.currentUser) {
      DeleteItem({ itemId: item.id });
    } else {
      removeLocalStorageItem();
    }
  };

  return (
    <li className="w-full p-2 rounded-md bg-zinc-700 flex flex-row justify-between items-center group">
      <h3 className="text-lg font-normal">{item.title}</h3>
      <button
        type="button"
        className="invisible group-hover:visible transition-all bg-rose-800 p-2 rounded-md cursor-pointer"
        onClick={handleItemDelete}
      >
        <CloseIcon />
      </button>
    </li>
  );
}

export default ItemsList;
