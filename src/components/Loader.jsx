import React from "react";
import "../components/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="/loader.gif" alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
