import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import './notFound.scss';

function NotFound() {
  return (
    <div className='Container-notfound'>
      <div className="notfound-card">
        <div className="Nook">
          <h1><AiOutlineAlipayCircle />Nook-Social</h1>
        </div>
        
        <div className="error-content">
          <BiErrorAlt className="error-icon" />
          <h2>404</h2>
          <p className="error-title">Page Not Found</p>
          <p className="error-desc">Oops! The page you are looking for doesn't exist or has been moved.</p>
        </div>

        <Link to="/" className="home-btn">Go Back Home</Link>
      </div>
    </div>
  );
}

export default NotFound;