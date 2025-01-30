import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import nchsLogo from '../images/nchs_logo.png';
import "./NavbarHome.css"


const NavbarHome = () => {
  return (
    <nav className="navbar-home">
      <div className="navbar-left">
        <img src={nchsLogo} alt="" />
      </div>
      <div className="navbar-center">
        <Link className='nav-link' to="/">Home</Link>
        <Link className='nav-link' to="#about">About Us</Link>
        <Link className='nav-link' to="#faq">FAQs</Link>
      </div>
      <div className="navbar-right">
        <Link className='nav-link' to="/signin">Sign In</Link>
        <Link to="/signup"><button className='navbar-right-button'>Sign Up</button></Link>
      </div>
    </nav>
  )
}

export default NavbarHome
