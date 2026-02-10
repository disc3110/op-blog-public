import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Catch-all → home for now */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;