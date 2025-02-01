import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import "./CompanyJobCard.css";

const CompanyJobCard = ({ job }) => {
  // Extract job data from the props
  const { role, salaryMin, salaryMax, location, type, applicants, postTime, endTime, status, companyId, createdBy, rejectionReason } = job;
  const [creatorName, setCreatorName] = useState("");
  const [showRejectionReason, setShowRejectionReason] = useState(false);

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

  const calculateProgress = () => {
    if (!postTime?.seconds || !endTime?.seconds) return 0;
    
    const now = new Date().getTime();
    const start = new Date(postTime.seconds * 1000).getTime();
    const end = new Date(endTime.seconds * 1000).getTime();
    
    if (now > end) return 100;
    if (now < start) return 0;
    
    const total = end - start;
    const current = now - start;
    const progress = (current / total) * 100;
    
    return Math.min(Math.max(progress, 0), 100);
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
            <h3 className='company-job-card-applicants'>{job.applicants || 0}</h3>
            <p>Candidates Applied</p>
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
        <div className="company-job-card-progress-bar">
          <div 
            className="company-job-card-progress-fill"
            style={{
              width: `${calculateProgress()}%`
            }}
          />
        </div>
      </div>
      <div className="company-job-card-bottom">
        <div className="company-job-card-bottom-main">
          <p className="company-job-card-creator">
            Created by <Link className='company-job-card-creator-link'>{creatorName}</Link>
          </p>
          <div className="company-job-card-buttons">
            <Link 
              className="company-job-card-bottom-view-details" 
              to={`/job/${job.id}`}
              state={{ setStatusToPending: status === 'Closed' }}
            >
              View Details {'>'}
            </Link>
            
            {status === 'Closed' && rejectionReason && (
              <button 
                className="view-rejection-reason"
                onClick={() => setShowRejectionReason(!showRejectionReason)}
              >
                {showRejectionReason ? 'Hide Rejection Reason' : 'View Rejection Reason'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Reason Popup */}
      {showRejectionReason && status === 'Closed' && rejectionReason && (
        <div className="rejection-popup-overlay">
          <div className="rejection-popup">
            <div className="rejection-popup-header">
              <h3>Rejection Reason</h3>
              <button 
                className="close-rejection-popup"
                onClick={() => setShowRejectionReason(false)}
              >
                ×
              </button>
            </div>
            <p className="rejection-reason-text">{rejectionReason}</p>
            <p className="rejection-note">
              Note: To repost this job, please edit the listing to address the rejection reason.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyJobCard;
