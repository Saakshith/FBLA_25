import React from 'react'
import NavbarMain from '../find_jobs/navbar_main/NavbarMain'
import "../find_jobs/FindJobs.css"
import nchsLogo from "../images/nchs_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Filters from '../find_jobs/filters/Filters'
import AdminCard from './admin_card/AdminCard'

const AdminPortal = () => {
  return (
    <div className='find-jobs'>
      <NavbarMain />
      <div className="find-jobs-hero">
        <h1>Approve Safe Jobs for students</h1>
        <p>Easily review and approve job listings to ensure they meet our safety standards, providing students with secure and reliable job opportunities.</p>
        <div className="find-jobs-hero-bottom">
            <input type="text" />
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        </div>
      </div>
      <div className="find-jobs-main">
        <Filters />
        <div className="find-jobs-card-container">
            <AdminCard />
        </div>
      </div>
    </div>
  )
}

export default AdminPortal
