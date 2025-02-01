import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  console.log("LoadingSpinner rendered"); // Debug log
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <h2 className="loading-text">Loading NCHS Jobs...</h2>
      <p className="loading-subtext">Please wait while we fetch the latest opportunities</p>
    </div>
  );
};

export default LoadingSpinner; 