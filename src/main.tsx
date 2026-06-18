import { createRoot } from "react-dom/client";
import "./i18n/config";
import App from "./App.tsx";
import "./index.css";

// Register Service Worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Service worker registered successfully
      })
      .catch((error) => {
        // Service worker registration failed
      });
  });
}

const container = document.getElementById("root");

if (!container) {
    throw new Error("Root container #root was not found.");
}

createRoot(container).render(<App />);
