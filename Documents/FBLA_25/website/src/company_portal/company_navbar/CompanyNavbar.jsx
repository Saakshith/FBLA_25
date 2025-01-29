import React from 'react'
import sampleProfilePicture from "../../images/sample_profile_picture.JPG"
import {Link} from 'react-router-dom'
import nchsLogo from "../../images/nchs_logo.png"
import "./CompanyNavbar.css"

const CompanyNavbar = () => {
  return (
    <nav className='company-navbar'>
      {/* <div className="logo-container">
        <Link className="logo">
            <img src={nchsLogo} alt="" />
            <h3>Recruitment</h3>
        </Link>
      </div>
      <div className="nav-center">
        <Link className="nav-link">Jobs</Link>
        <Link className="nav-link">Applicants</Link>
        <Link className="nav-link">Profile</Link>
      </div>
      <div className="nav-right">
        <Link className='profile-picture'><img src={sampleProfilePicture} alt="" /></Link>
      </div> */}
    </nav>
  )
}

export default CompanyNavbar
