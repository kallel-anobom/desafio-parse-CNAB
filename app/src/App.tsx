import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import UploadPage from "./pages/UploadPage";
import TransactionsPage from "./pages/TransactionsPage";

import Navbar from "./components/Navbar/Navbar";

import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
