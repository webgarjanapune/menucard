// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        {/* Address */}
        <div className="nav-address">
          <p>📍 123 Main Street, Pune, India</p>
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {/* Social Icons */}
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>

          {/* Contact */}
          <div className="nav-contact">
            <FiPhoneCall />
            <span>+91 98765 43210</span>
          </div>

          {/* Login Button */}
          <div className="nav-login">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
