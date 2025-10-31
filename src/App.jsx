import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Loader from "./components/Loader.jsx";
import menuData from "./menuData.js";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [products, setProducts] = useState(menuData); // start with existing products
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  // Fetch products from backend and merge with existing menuData
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        // Merge backend products with local menuData
        setProducts([...menuData, ...data]);
      } catch (err) {
        console.error("Failed to fetch backend products:", err);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/login"
          element={
            adminLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <AdminLogin onLogin={setAdminLoggedIn} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            adminLoggedIn ? (
              <AdminDashboard
                products={products}
                setProducts={setProducts}
                onLogout={() => setAdminLoggedIn(false)}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
