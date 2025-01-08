import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/config";
import { useNavigate } from "react-router";
import { useItemsContext } from "../hooks/useItemsContext";
import { Item } from "../context/ItemsContext";
import { toast } from "sonner";

export function ItemsService() {
  const navigate = useNavigate();
  const { items, addItems, addOneItem, deleteItem, attendItem } =
    useItemsContext();
  const itemsRef = collection(db, "items");

  const GetItems = async () => {
    try {
      const user = getAuth().currentUser;

      if (!user) {
        navigate("/sign-in");
        throw new Error("No user is authenticated");
      }

      const queryItems = query(itemsRef, where("userId", "==", user.uid));
      const items = await getDocs(queryItems);
      const itemsData: Item[] = items.docs.map((item) => ({
        id: item.id,
        userId: item.data().userId,
        title: item.data().title,
      }));

      addItems(itemsData);
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.log(`FirestoreError: `, error.message);
      }
      console.log("Error: ", error);
    }
  };

  const CreateItem = async ({ title }: { title: string }) => {
    try {
      const user = getAuth().currentUser;

      if (!user) {
        navigate("/sign-in");
        throw new Error("No user is authenticated");
      }

      const newItemRef = await addDoc(itemsRef, {
        userId: user.uid,
        title: title,
      });
      const newItem = await getDoc(newItemRef);
      if (!newItem.exists()) {
        throw new Error("Something went wrong");
      }

      const itemData: Item = {
        id: newItemRef.id,
        userId: newItem.data().userId,
        title: newItem.data().title,
      };
      addOneItem(itemData);
      toast.success("Item created 🎉");
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.log(`FirestoreError: `, error.message);
      }
      console.log("Error: ", error);
    }
  };

  const DeleteItem = async ({ itemId }: { itemId: string }) => {
    try {
      const itemRef = doc(db, "items", itemId);
      if (!itemRef) {
        throw new Error("No item found");
      }
      await deleteDoc(itemRef);
      deleteItem(itemId);
      toast.error("Item deleted 😔");
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.log(`FirestoreError: `, error.message);
      }
      console.log("Error: ", error);
    }
  };

  const AttendItem = async () => {
    try {
      const firstItem = items?.[0];
      if (!firstItem) {
        toast.error("There must an item to attend");
        throw new Error("No item found");
      }

      const itemId = firstItem?.id;
      const itemRef = doc(db, "items", itemId);
      if (!itemRef) {
        throw new Error("No item found");
      }
      await deleteDoc(itemRef);
      attendItem();
      toast.success("Item attended 🎉");
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.log(`FirestoreError: `, error.message);
      }
      console.log("Error: ", error);
    }
  };

  return {
    GetItems,
    CreateItem,
    DeleteItem,
    AttendItem,
  };
}
