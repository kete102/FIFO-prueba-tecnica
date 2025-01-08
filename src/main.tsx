import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import App from "./routes/HomePage.tsx";
import SignIn from "./routes/SignIn.tsx";
import SignUp from "./routes/SignUp.tsx";
import ItemsProvider from "./context/ItemsProvider.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={
            <ItemsProvider>
              <App />
            </ItemsProvider>
          }
        />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  </BrowserRouter>,
);
