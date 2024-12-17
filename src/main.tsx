import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(
  document.getElementById("root") || document.createElement("div")
).render(<App />);
