// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ products, setProducts, onLogout }) => {
  const categories = [
    "Veg Starters",
    "Loaded French Fries",
    "Non Veg",
    "Hot Coffees",
    "Flavoured Coffees",
    "Cold Coffees",
    "Desserts",
  ];

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: categories[0],
    img: null,
  });

  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState(null); // { text: "", type: "success" | "error" }

  // Handle input changes
  const handleChange = (e, isEdit = false) => {
    const { name, value, files } = e.target;
    if (isEdit) {
      if (name === "img") setEditProduct({ ...editProduct, img: files[0] });
      else setEditProduct({ ...editProduct, [name]: value });
    } else {
      if (name === "img") setNewProduct({ ...newProduct, img: files[0] });
      else setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.img) {
      setMessage({ text: "❌ Please fill all fields!", type: "error" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("img", newProduct.img);

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add product");
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setMessage({ text: "✅ Product added successfully!", type: "success" });
      setNewProduct({ name: "", price: "", category: categories[0], img: null });
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ Failed to add product!", type: "error" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  // Update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editProduct.img instanceof File) {
        const formData = new FormData();
        formData.append("name", editProduct.name);
        formData.append("price", editProduct.price);
        formData.append("category", editProduct.category);
        formData.append("img", editProduct.img);
        res = await fetch(`http://localhost:5000/products/${editProduct._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch(`http://localhost:5000/products/${editProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editProduct.name,
            price: editProduct.price,
            category: editProduct.category,
          }),
        });
      }

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
      setEditProduct(null);
      setMessage({ text: "✅ Product updated!", type: "success" });
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ Update failed!", type: "error" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
      setMessage({ text: "🗑️ Product deleted!", type: "success" });
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ Delete failed!", type: "error" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const getImageUrl = (img) =>
    img?.startsWith("http") ? img : `http://localhost:5000${img}`;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>

      {/* Add Product Form */}
      <form className="admin-form" onSubmit={handleAddProduct}>
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
        <select name="category" value={newProduct.category} onChange={handleChange}>
          {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
        </select>
        <input type="file" name="img" accept="image/*" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <div className="product-preview">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            {product.img && <img src={getImageUrl(product.img)} alt={product.name} />}
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => setEditProduct(product)}>✏️ Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <input type="text" name="name" value={editProduct.name} onChange={(e) => handleChange(e, true)} />
              <input type="number" name="price" value={editProduct.price} onChange={(e) => handleChange(e, true)} />
              <select name="category" value={editProduct.category} onChange={(e) => handleChange(e, true)}>
                {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
              </select>
              <input type="file" name="img" accept="image/*" onChange={(e) => handleChange(e, true)} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditProduct(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Centered message */}
      {message && (
        <div className={`message-popup ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
