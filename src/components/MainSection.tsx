import { useState } from "react";
import CurrentItems from "./CurrentItems";
import { ItemsService } from "../services/Items";
import { getAuth } from "firebase/auth";
import { LocalStorageItems } from "../services/LocalStorageItems";
import { PlusIcon } from "./icons";

function MainSection() {
  const auth = getAuth();
  const { CreateItem } = ItemsService();
  const { addLocalStorageItem } = LocalStorageItems();
  const [itemTitle, setItemTitle] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (auth.currentUser) {
      CreateItem({ title: itemTitle });
    } else {
      addLocalStorageItem({ itemTitle });
    }
    setItemTitle("");
  };

  return (
    <main className="bg-black w-full flex flex-row justify-between gap-2 rounded-lg p-2 h-[calc(100%-200px)]">
      <section className="w-full p-4 rounded-lg bg-zinc-900">
        <form onSubmit={handleSubmit}>
          <legend className="text-xl font-semibold mb-4">Add to queue</legend>
          <input
            placeholder="new task"
            className="p-2 w-full text-md mb-4 text-black bg-zinc-300 placeholder:text-md rounded-md focus:outline-none focus:ring focus:ring-violet-700"
            value={itemTitle}
            onChange={(e) => {
              setItemTitle(e.currentTarget.value);
            }}
            required
          />
          <button
            className="w-full p-2 disabled:bg-zinc-700 inline-flex items-center gap-2 justify-center px-4 mt-4  font-semibold text-lg rounded-md bg-zinc-950 text-white hover:bg-zinc-800"
            type="submit"
            disabled={itemTitle == ""}
          >
            {" "}
            Add item <PlusIcon className="w-5 h-5" />
          </button>
        </form>
      </section>
      <CurrentItems />
    </main>
  );
}

export default MainSection;
