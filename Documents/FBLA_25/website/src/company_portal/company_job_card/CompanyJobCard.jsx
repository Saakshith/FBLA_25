import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import "./CompanyJobCard.css";

const CompanyJobCard = ({ job }) => {
  // Extract job data from the props
  const { role, salaryMin, salaryMax, location, type, applicants, postTime, endTime, status, companyId, createdBy } = job;
  const [creatorName, setCreatorName] = useState("");

  useEffect(() => {
    const fetchCreatorName = async () => {
      try {
        if (createdBy) {
          // Since createdBy is a reference, we need to fetch the user document from Firestore
          const userSnapshot = await getDoc(createdBy);
          
          if (userSnapshot.exists()) {
            setCreatorName(userSnapshot.data().firstName || 'Unknown'); // Replace 'firstName' with your actual field name
          } else {
            setCreatorName('Unknown');
          }
        }
      } catch (error) {
        console.error('Error fetching creator name:', error);
        setCreatorName('Error fetching name');
      }
    };

    fetchCreatorName();
  }, [createdBy]);

  // Convert Firestore timestamp to a readable date if available
  const formattedPostTime = postTime?.seconds 
    ? new Date(postTime.seconds * 1000).toLocaleDateString() 
    : 'N/A';

  const formattedEndTime = endTime?.seconds 
    ? new Date(endTime.seconds * 1000).toLocaleDateString() 
    : 'N/A';

  // Add this function to determine status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'var(--yellow-color)';
      case 'open':
        return 'var(--green-color)';
      case 'closed':
        return 'var(--red-color)';
      default:
        return 'var(--yellow-color)'; // default to yellow for unknown status
    }
  };

  return (
    <div className='company-job-card'>
      <div className="company-job-card-top">
        <div 
          className="company-job-card-detail-status-container"
          style={{ backgroundColor: getStatusColor(status) }}
        >
          <div className="company-job-card-detail-status-circle"></div>
          <p className="company-job-card-detail-status">{status || 'Pending'}</p>
        </div>
        <div className="company-job-card-detail-container">
          <p className="company-job-card-detail">
            ${salaryMin} - ${salaryMax}
          </p>
          <p className="company-job-card-detail">
            {location || 'N/A'}
          </p>
          <p className="company-job-card-detail">
            {type || 'N/A'}
          </p>
        </div>
      </div>
      <h3 className="company-job-card-title">{role || 'Job Title'}</h3>
      <div className="company-job-card-center">
        <div className="company-job-card-interview-applicants">
          <Link 
            className="company-job-card-bottom-applicants" 
            to={`/job/${job.id}/candidates`}
            data-count={job.applicants || 0}
          >
            Candidates Applied
          </Link>
          <Link 
            className="company-job-card-interview-container"
          >
            <h3 className='company-job-card-interview'>{0}</h3>
            <p>Completed Interviews</p>
          </Link>
        </div>
      </div>
      <div className="company-job-card-progress-bar-container">
        <div className="company-job-card-time-and-time-remaining">
          <p className='company-job-card-time'>
            Posted on: {formattedPostTime}
          </p>
          <div className="company-job-card-time">
            Ends on: {formattedEndTime}
          </div>
        </div>
        <div className="company-job-card-progress-bar"></div>
      </div>
      <div className="company-job-card-bottom">
        <p className="company-job-card-creator">
          Created by <Link className='company-job-card-creator-link'>{creatorName}</Link>
        </p>
        <Link 
          className="company-job-card-bottom-view-details" 
          to={`/job/${job.id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CompanyJobCard;
