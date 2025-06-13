import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages/home/Home";
import { Provider } from "./Provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Home />
    </Provider>
  </StrictMode>
);
