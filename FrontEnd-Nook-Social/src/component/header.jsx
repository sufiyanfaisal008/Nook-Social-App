import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { BiSearch, BiUser, BiLogOut, BiMenu, BiX, BiHomeAlt } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import { store } from '../store/states';
import './header.scss';

function Header() {
  const { globalLogout, user } = store();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (globalLogout) globalLogout();
    navigate('/login');
  };

  const navItems = [
    {
      label: "Home",
      icon: <BiHomeAlt />,
      path: "/",
    },
    {
      label: "Messages",
      icon: <IoIosChatbubbles />,
      path: "/chatApp",
    }
  ];

  const avatarSrc = user?.profilePicture || user?.profilePic || user?.avatar;
  const userName = user?.firstname
    ? `${user.firstname} ${user.lastname || ''}`.trim()
    : user?.username || user?.name || user?.email || "Profile";

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

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <div className="nav-navigation-links">
            {navItems.map((navItem, index) => {
              const isActive = location.pathname === navItem.path;
              return (
                <Link
                  key={index}
                  to={navItem.path}
                  className={`nav-link ${isActive ? 'active-link' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-icon">{navItem.icon}</span>
                  <span className="nav-text">{navItem.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="nav-user-controls">
            <Link
              to="/profile"
              className={`profile-pill ${location.pathname === '/profile' ? 'active-pill' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <div className="avatar">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="User Avatar" className="user-avatar-img" />
                ) : (
                  <BiUser />
                )}
              </div>
              <span className="user-name">{userName}</span>
            </Link>

            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <BiLogOut />
              <span>Logout</span>
            </button>
          </div>
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