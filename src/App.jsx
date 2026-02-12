import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { useEffect } from "react";

function App() {

  console.log("App.jsx - running useEffect to check URL for token");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("App.jsx - token from URL:", token);

    if (token) {
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Catch-all → home for now */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;