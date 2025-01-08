/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  TasksIcon,
} from "../components/icons";
import MainSection from "../components/MainSection";
import { ItemsService } from "../services/Items";
import { Toaster } from "sonner";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { LocalStorageItems } from "../services/LocalStorageItems";

function App() {
  const auth = getAuth();
  const { GetItems } = ItemsService();
  const { getLocalStorageItems } = LocalStorageItems();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/sign-in");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        GetItems();
      } else {
        getLocalStorageItems();
      }
    });
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 text-white mx-auto p-2 flex flex-col justify-center gap-8">
      <section className="w-full max-w-4xl mx-auto flex flex-row items-center justify-between px-4 py-2">
        <h1 className="font-bold text-2xl inline-flex items-center gap-2">
          FIFO Managment <TasksIcon />
        </h1>
        {auth.currentUser ? (
          <button
            type="button"
            onClick={handleLogOut}
            className="rounded-md px-4 py-2 bg-zinc-200 inline-flex items-center gap-2 text-black hover:bg-zinc-400 font-bold"
          >
            Log out <LogOutIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              navigate("/sign-in");
            }}
            className="rounded-md px-4 py-2 bg-zinc-200 inline-flex items-center gap-2 text-black hover:bg-zinc-400 font-bold"
          >
            Log in <LogInIcon className="w-5 h-5" />
          </button>
        )}
      </section>
      <MainSection />
      <Toaster richColors position="bottom-center" />
      {!auth.currentUser && (
        <footer className="w-full text-center">
          <h3 className="font-semibold text-lg inline-flex items-center gap-2">
            Login to save your items in firebase{" "}
            <InfoIcon className="w-5 h-5" />
          </h3>
        </footer>
      )}
    </div>
  );
}

export default App;
