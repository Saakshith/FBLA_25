import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import nchsLogo from '../images/nchs_logo.png';
import "./NavbarHome.css"

const NavbarHome = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar-home">
      {/* Logo on the left */}
      <div className="navbar-left">
        <img src={nchsLogo} alt="Logo" />
      </div>

      {/* Hamburger menu for mobile */}
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Navigation links (center) */}
      <div className={`navbar-center ${menuActive ? 'active' : ''}`}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/#about">About Us</Link>
        <Link className="nav-link" to="/#faqs">FAQs</Link>
        {/* Add Sign In and Sign Up here for mobile */}
        <Link className="nav-link mobile-only" to="/signin">Sign In</Link>
        <Link to="/signup" className="mobile-only">
          <button className="navbar-right-button">Sign Up</button>
        </Link>
      </div>

      {/* Sign In and Sign Up links (right) for larger screens */}
      <div className="navbar-right desktop-only">
        <Link className="nav-link" to="/signin">Sign In</Link>
        <Link to="/signup">
          <button className="navbar-right-button">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarHome;