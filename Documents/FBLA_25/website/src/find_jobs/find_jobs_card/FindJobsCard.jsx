import React from 'react'
import "./FindJobsCard.css"
import McDonaldsLogo from "../../images/mcdonalds_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const FindJobsCard = () => {
  return (
    <div className='find-jobs-card'>
      <div className="find-jobs-card-left">
        <img src={McDonaldsLogo} alt="" />
        <div className="job-role-company-container">
            <h3 className="job-role">Cashier</h3>
            <p className="job-company">McDonalds</p>
        </div>
      </div>
      <div className="find-jobs-card-center">
            <div className="job-detail">
                <p>$15 - $22</p>
            </div>
            <div className="job-detail">
                <p>Bothell, WA</p>
            </div>
            <div className="job-detail">
                <p>In-Person</p>
            </div>
            <div className="job-detail">
                <p className='number-of-applicants'>7 Applicants</p>
            </div>
      </div>
      <div className="find-jobs-card-right">
            <p className="job-post-time">1 hour ago</p>
            <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  )
}

export default FindJobsCard
