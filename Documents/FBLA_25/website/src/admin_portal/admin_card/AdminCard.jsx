import React from "react";
import "./AdminCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminCard = ({ job }) => {
  return (
    <div className="admin-card">
      <div className="admin-card-left">
        <img src={job.logo} alt={`${job.company} logo`} />
        <div className="job-role-company-container">
          <h3 className="job-role">{job.role}</h3>
          <p className="job-company">{job.company}</p>
          <p className="job-post-time">1 hour ago</p>
        </div>
      </div>
      <div className="admin-card-center">
        <div className="job-detail">
          <p>${job.salaryMin} - {job.salaryMax}</p>
        </div>
        <div className="job-detail">
          <p>{job.location}</p>
        </div>
        <div className="job-detail">
          <p>{job.type}</p>
        </div>
      </div>
      <div className="admin-card-right">
              <button className="right-button" id="approve">Approve</button>
              <button className="right-button" id="deny">Deny</button>
      </div>
    </div>
  );
};

export default AdminCard;
