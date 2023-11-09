// src/App.js

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AuthProvider } from './AuthContext'; // import AuthProvider từ AuthContext
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Profile from './pages/Profile';

function ScrollToTop() {
  const location = useLocation();  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);  
  return null;
}

function App() {
  return (
    <AuthProvider> {/* Bao gồm AuthProvider tại đây */}
      <Router>
        <ScrollToTop />
        <Navbar />
        <ToastContainer />
        <div className="container main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
