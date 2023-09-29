import React from 'react';
import './Loader.css'; // Стилі для лоадера (ви можете створити свої)

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
    </div>
  );
};

export default Loader;