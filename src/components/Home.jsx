// src/components/Home.jsx
import React, { useState } from "react";
import "../components/Home.css";

export default function Home({ products }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const categories = [...new Set(products.map((item) => item.category))];

  const getImageUrl = (img) => (img.startsWith("http") ? img : `http://localhost:5000${img}`);

  return (
    <>
      <section className="home-section">
        <video autoPlay muted loop className="video-bg">
          <source src="/menubg.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <h1>Special Menu</h1>
          <p>Enjoy our fresh specials</p>
        </div>
      </section>

      <section className="menu-section">
        {categories.map((cat) => (
          <div key={cat} className="category-block">
            <h3 className="category-heading">{cat}</h3>
            <div className="menu-grid">
              {products
                .filter((item) => item.category === cat)
                .map((item) => (
                  <div
                    key={item._id || item.id}
                    className="menu-card"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img src={getImageUrl(item.img)} alt={item.name} className="menu-img" />
                    <div className="menu-info">
                      <h3>{item.name}</h3>
                    </div>
                    <span className="price">₹{item.price}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {selectedItem && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              &times;
            </button>
            <img src={getImageUrl(selectedItem.img)} alt={selectedItem.name} />
            <h3>{selectedItem.name}</h3>
            <span className="price">₹{selectedItem.price}</span>
          </div>
        </div>
      )}
    </>
  );
}
