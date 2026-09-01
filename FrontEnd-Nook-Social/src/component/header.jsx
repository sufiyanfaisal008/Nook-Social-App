import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { BiSearch, BiUser, BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { store } from '../store/states';
import './header.scss';

function Header() {
  const { globalLogout, user } = store();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (globalLogout) globalLogout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-container">

        <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
          <AiOutlineAlipayCircle className="logo-icon" />
          <span>Nook-Social</span>
        </Link>

        <div className="search-box">
          <BiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search posts, people..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link
            to="/profile"
            className="profile-pill"
            onClick={() => setMenuOpen(false)}
          >
            <div className="avatar">
              <BiUser />
            </div>
            <span className="user-name">
              {user?.email || user?.name || "Profile"}
            </span>
          </Link>

          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <BiLogOut />
            <span>Logout</span>
          </button>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <BiX /> : <BiMenu />}
        </button>

      </div>
    </header>
  );
}

export default Header;