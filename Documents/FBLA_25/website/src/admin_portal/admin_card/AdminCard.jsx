import React from 'react'
import "./AdminCard.css"
import McDonaldsLogo from "../../images/mcdonalds_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminCard = () => {
  return (
    <div className='admin-card'>
      <div className="admin-card-left">
        <img src={McDonaldsLogo} alt="" />
        <div className="job-role-company-container">
            <h3 className="job-role">Cashier</h3>
            <p className="job-company">McDonalds</p>
            <p className="job-post-time">1 hour ago</p>
        </div>
      </div>
      <div className="admin-card-center">
            <div className="job-detail">
                <p>$15 - $22</p>
            </div>
            <div className="job-detail">
                <p>Bothell, WA</p>
            </div>
            <div className="job-detail">
                <p>In-Person</p>
            </div>
      </div>
      <div className="admin-card-right">
              <button className="right-button" id="approve">Approve</button>
              <button className="right-button" id="deny">Deny</button>
      </div>
    </div>
  )
}

export default AdminCard
