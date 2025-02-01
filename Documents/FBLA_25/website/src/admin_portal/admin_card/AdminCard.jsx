import React, { useState, useEffect } from "react";
import "./AdminCard.css";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const AdminCard = ({ job, onJobUpdate }) => {
  const [companyLogo, setCompanyLogo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchCompanyLogo = async () => {
      try {
        if (job.companyId) {
          const companyDoc = await getDoc(job.companyId);
          if (companyDoc.exists()) {
            setCompanyLogo(companyDoc.data().logoUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching company logo:', error);
      }
    };

    fetchCompanyLogo();
  }, [job.companyId]);

  const handleApprove = async () => {
    try {
      setIsUpdating(true);
      const jobRef = doc(db, 'Jobs', job.id);
      
      await updateDoc(jobRef, {
        status: "Open"
      });
      console.log("Job approved successfully!");
      onJobUpdate();
    } catch (error) {
      console.error("Error approving job:", error);
      alert("Failed to approve job. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeny = () => {
    setShowRejectPopup(true);
  };

  const handleConfirmDeny = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      setIsUpdating(true);
      const jobRef = doc(db, 'Jobs', job.id);
      
      await updateDoc(jobRef, {
        status: "Closed",
        rejectionReason: rejectionReason,
        rejectedAt: new Date()
      });
      console.log("Job denied successfully!");
      setShowRejectPopup(false);
      setRejectionReason("");
      onJobUpdate();
    } catch (error) {
      console.error("Error denying job:", error);
      alert("Failed to deny job. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="admin-card">
        <div className="admin-card-left">
          <img 
            src={companyLogo || '/default-logo.png'} 
            alt={`${job.company} logo`} 
            className="company-logo"
          />
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
          <button 
            className="right-button" 
            id="approve"
            onClick={handleApprove}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Approve'}
          </button>
          <button 
            className="right-button" 
            id="deny"
            onClick={handleDeny}
            disabled={isUpdating}
          >
            Deny
          </button>
        </div>
      </div>

      {showRejectPopup && (
        <div className="rejection-popup-overlay">
          <div className="rejection-popup">
            <h3>Reject Job Listing</h3>
            <p>Please provide a reason for rejecting this job listing:</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows="4"
            />
            <div className="rejection-popup-buttons">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowRejectPopup(false);
                  setRejectionReason("");
                }}
              >
                Cancel
              </button>
              <button 
                className="confirm-button"
                onClick={handleConfirmDeny}
                disabled={isUpdating}
              >
                {isUpdating ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCard;
