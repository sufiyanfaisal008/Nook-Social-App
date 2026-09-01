import React from 'react';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import './loadingpage.scss';

function Loadingpage() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo-wrapper">
          <AiOutlineAlipayCircle className="pulse-logo" />
          <div className="glow-ring"></div>
        </div>
        
        <h1 className="brand-name">Nook-Social</h1>
        
        <div className="spinner-bar">
          <div className="spinner-progress"></div>
        </div>
        
        <p className="loading-text">Loading experience...</p>
      </div>
    </div>
  );
}

export default Loadingpage;