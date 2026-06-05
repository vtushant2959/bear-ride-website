import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoadScript } from "@react-google-maps/api";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAPS_LIBS = ["places"];

function AppRoot() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { background: "#18181b", color: "#fff", border: "1px solid rgba(250,204,21,0.2)" } }} />
      <LangProvider>
      <AuthProvider>
        {MAPS_KEY ? (
          <LoadScript googleMapsApiKey={MAPS_KEY} libraries={MAPS_LIBS}>
            <App />
          </LoadScript>
        ) : (
          <App />
        )}
      </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
