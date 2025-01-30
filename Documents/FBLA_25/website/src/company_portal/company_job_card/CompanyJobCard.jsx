import React from 'react'
import { Link } from 'react-router-dom'
import "./CompanyJobCard.css"

const CompanyJobCard = () => {
  return (
    <div className='company-job-card'>
      <div className="company-job-card-top">
        <div className="company-job-card-detail-status-container">
            <div className="company-job-card-detail-status-circle"></div>
            <p className="company-job-card-detail-status">Open</p>
        </div>
        <div className="company-job-card-detail-container">
            <p className="company-job-card-detail">
                $15 - $22
            </p>
            <p className="company-job-card-detail">
                Bothell, WA
            </p>
            <p className="company-job-card-detail">
                In-Person
            </p>
        </div>
      </div>
      <h3 className="company-job-card-title">Cashier</h3>
      <div className="company-job-card-center">
        <div className="company-job-card-interview-applicants">
            <Link className="company-job-card-applicants-container">
                <h3 className='company-job-card-applicants'>12</h3>
                <p>Candidates Applied</p>
            </Link>
            <Link className="company-job-card-interview-container">
                <h3 className='company-job-card-interview'>28</h3>
                <p>Completed Interviews</p>
            </Link>
        </div>
      </div>
      <div className="company-job-card-progress-bar-container">
        <div className="company-job-card-time-and-time-remaining">
            <p className='company-job-card-time'>Posted on 23 Jul - Close at 17 Sep</p>
            <p className="company-job-card-time-remaining">12 Days Ago</p>
        </div>
        <div className="company-job-card-progress-bar"></div>
      </div>
      <div className="company-job-card-bottom">
        <p className="company-job-card-creator">Created by <Link className='company-job-card-creator-link'>Prasanna</Link></p>
        <Link className="company-job-card-bottom-view-details">View Details</Link>
      </div>
    </div>
  )
}

export default CompanyJobCard
