import React from "react";
import "./FindJobsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FindJobsCard = ({ job }) => {
  const formattedPostTime = job.postTime?.seconds ? new Date(job.postTime.seconds * 1000).toLocaleDateString() : 'N/A';
     
  return (
    <div className="find-jobs-card">
      <div className="find-jobs-card-left">
        <img src={job.logo} alt={`${job.company} logo`} />
        <div className="job-role-company-container">
          <h3 className="job-role">{job.role}</h3>
          <p className="job-company">{job.company}</p>
        </div>
      </div>
      <div className="find-jobs-card-center">
        <div className="job-detail">
          <p>${job.salaryMin} - {job.salaryMax}</p>
        </div>
        <div className="job-detail">
          <p>{job.location}</p>
        </div>
        <div className="job-detail">
          <p>{job.type}</p>
        </div>
        <div className="job-detail">
          <p className="number-of-applicants">{job.applicants} Applicants</p>
        </div>
      </div>
      <div className="find-jobs-card-right">
        <p className="job-post-time">{formattedPostTime}</p>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
};

export default FindJobsCard;
