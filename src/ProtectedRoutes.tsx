import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { toast } from "sonner";

export default function ProtectedRoutes() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.warning("Signed in as GUEST");
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate]);
  return <Outlet />;
}
