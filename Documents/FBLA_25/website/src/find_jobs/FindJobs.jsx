import React from 'react'
import NavbarMain from './navbar_main/NavbarMain'
import "./FindJobs.css"
import nchsLogo from "../images/nchs_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const FindJobs = () => {
  return (
    <div className='find-jobs'>
      <NavbarMain />
      <div className="find-jobs-hero">
        <h1>Find Your Dream High School Jobs</h1>
        <p>Explore a wide range of job opportunities designed for high school students, helping you gain experience, build skills, and start your career journey!</p>
        <div className="find-jobs-hero-bottom">
            <input type="text" />
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        </div>
      </div>
    </div>
  )
}

export default FindJobs
