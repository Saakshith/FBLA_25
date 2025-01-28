import React from 'react'
import { Link } from 'react-router-dom'
import "./NavbarMain.css"
import nchsLogo from "../../images/nchs_logo.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
import sampleProfilePic from "../../images/sample_profile_picture.JPG"

const NavbarMain = () => {
  return (
    <nav>
      <div className="nav-left">
        <Link><img src={nchsLogo} alt="" /></Link>
      </div>
      <div className="nav-middle">
        <Link className="nav-link active">Find Jobs</Link>
        <Link className="nav-link ">Find Companies</Link>
        <Link className="nav-link ">Find People</Link>
      </div>
      <div className="nav-right">
        <Link className="for-business">
            <FontAwesomeIcon icon={faBriefcase} className="for-business-icon" />
            <p>For Business</p>
        </Link>
        <Link className='profile'>
            <img src={sampleProfilePic} alt="" className="profile-icon" />
            <div className='profile-text'>
                <h3>Saakshith Chikoti</h3>
                <p>UI/UX Designer</p>
            </div>
        </Link>
      </div>
    </nav>
  )
}

export default NavbarMain
