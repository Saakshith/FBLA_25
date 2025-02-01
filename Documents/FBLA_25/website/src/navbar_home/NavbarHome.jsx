import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import nchsLogo from '../images/nchs_logo.png';
import "./NavbarHome.css";

const NavbarHome = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();

  // Ensure consistency with App.js route
  const isCompanyPage = location.pathname.includes("/companylandingpage");

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  const scrollToSection = (sectionId) => {
    const targetPath = isCompanyPage ? "/companylandingpage" : "/";
    
    if (location.pathname !== targetPath) {
      window.location.href = `${targetPath}#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (menuActive) {
          setMenuActive(false);
        }
      }
    }
  };

  return (
    <nav className="navbar-home">
      {/* Logo on the left */}
      <div className="navbar-left">
        <img src={nchsLogo} alt="Logo" />
      </div>

      {/* Hamburger menu for mobile */}
      <div className="navbar-hamburger" onClick={() => setMenuActive(!menuActive)}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Navigation links (center) */}
      <div className={`navbar-center ${menuActive ? 'active' : ''}`}>
        <Link className="nav-link" to={isCompanyPage ? "/companylandingpage" : "/"}>
          Home
        </Link>
        <div 
          className="nav-link" 
          onClick={() => scrollToSection(isCompanyPage ? 'how' : 'about')} 
          style={{ cursor: 'pointer' }}
        >
          {isCompanyPage ? 'How It Works' : 'About Us'}
        </div>
        <div 
          className="nav-link" 
          onClick={() => scrollToSection('faq')} 
          style={{ cursor: 'pointer' }}
        >
          FAQs
        </div>
        {/* Mobile-only Sign In and Sign Up */}
        <Link className="nav-link mobile-only" to="/signin">Sign In</Link>
        <Link to="/signup" className="mobile-only">
          <button className="navbar-right-button">Sign Up</button>
        </Link>
      </div>

      {/* Sign In and Sign Up for desktop */}
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
