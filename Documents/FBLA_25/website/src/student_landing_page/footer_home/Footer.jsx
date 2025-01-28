import React from 'react'
import "./Footer.css"
import nchsLogo from "../../images/nchs_logo.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left Section */}
        <div className="footer-section">
          <img
            src={nchsLogo} // Replace with your logo path
            alt="NCHS Logo"
            className="footer-logo"
          />
          <h2 className="footer-heading">
            Find Your Next Job As an NCHS Student
          </h2>
          <p className="footer-text">Jobs at NCHS, 2025.</p>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h3 className="footer-subheading">Links</h3>
          <ul className="footer-links">
            <li><Link>Home</Link></li>
            <li><Link>About Us</Link></li>
            <li><Link>FAQ’s</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section">
          <h3 className="footer-subheading">Want to browse or post?</h3>
          <ul className="footer-links">
            <li><Link>Sign Up</Link></li>
            <li><Link>Sign In</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© Prasanna Patil, Sathvik Kotapati, Saakshith Chikoti</p>
        <Link>Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer
