import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import AuthLayout from "./auth/auth-layout.jsx";
import Header from "./components/header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="relative bg-slate-900 min-h-screen">
        <div className="lg:max-w-7xl mx-auto xl:px-0 px-4">
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
