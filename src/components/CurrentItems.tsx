import { getAuth } from "firebase/auth";
import { useItemsContext } from "../hooks/useItemsContext";
import { ItemsService } from "../services/Items";
import ItemsList from "./ItemsList";
import "./currentItems.css";
import { LocalStorageItems } from "../services/LocalStorageItems";
import { CheckIcon } from "./icons";

function CurrentItem() {
  const auth = getAuth();
  const { AttendItem } = ItemsService();
  const { removeLocalStorageItem } = LocalStorageItems();
  const handleAttendItem = () => {
    if (auth.currentUser) {
      AttendItem();
    } else {
      removeLocalStorageItem();
    }
  };
  const { items } = useItemsContext();

  return (
    <section className="w-full p-4 rounded-lg bg-zinc-900 flex flex-col">
      <h2 className="text-xl font-semibold mb-2">
        Current tasks: {items?.length}
      </h2>
      <div className="bg-zinc-300 h-[0.5px]"></div>
      <div className="hide-scrollbar flex-1 mt-4 overflow-y-scroll">
        <ItemsList />
      </div>
      <div className="mt-2">
        <button
          className="px-4 py-2 rounded-md inline-flex items-center gap-2 font-semibold text-lg bg-emerald-600 hover:bg-emerald-800"
          onClick={handleAttendItem}
        >
          Attend <CheckIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default CurrentItem;
