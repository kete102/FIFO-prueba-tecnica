import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import { useNavigate } from "react-router";

export function AuthService() {
  const auth = getAuth();
  const navigate = useNavigate();
  async function StartCreateUserWithEmailAndPasword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = createUserWithEmailAndPassword(auth, email, password);
      if (!user) {
        throw new Error("Error creating new user");
      }

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(`FirebaseError: ${error.code} ${error.message}`);
      }
      console.log("Error: ", error);
    }
  }

  async function StartSignInWithEmailAndPasword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user) {
        throw new Error("Error creating new user");
      }

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(`FirebaseError: ${error.code} ${error.message}`);
      }
      console.log("Error: ", error);
    }
  }
  return {
    StartSignInWithEmailAndPasword,
    StartCreateUserWithEmailAndPasword,
  };
}
