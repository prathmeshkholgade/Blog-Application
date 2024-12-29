import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.js";
import UserProtectedWrraper from "./pages/UserProtectedWrraper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProtectedWrraper>
        <App />
      </UserProtectedWrraper>
    </Provider>
  </StrictMode>
);
