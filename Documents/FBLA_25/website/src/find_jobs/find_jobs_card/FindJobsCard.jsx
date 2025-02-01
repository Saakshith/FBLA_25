import React, { useState, useEffect } from "react";
import "./FindJobsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FindJobsCard = ({ job }) => {
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (job.companyId) {
          const companyDoc = await getDoc(job.companyId);
          if (companyDoc.exists()) {
            const companyData = companyDoc.data();
            setCompanyLogo(companyData.logoUrl);
            setCompanyName(companyData.name);
          }
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    const checkIfLiked = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsLiked(userData.likedJobs?.includes(job.id) || false);
        }
      }
    };

    fetchCompanyDetails();
    checkIfLiked();
  }, [job.companyId, job.id]);

  const handleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in to save jobs!");
      return;
    }

    try {
      const userRef = doc(db, "Users", user.uid);
      
      if (isLiked) {
        // Remove from liked jobs
        await updateDoc(userRef, {
          likedJobs: arrayRemove(job.id)
        });
      } else {
        // Add to liked jobs
        await updateDoc(userRef, {
          likedJobs: arrayUnion(job.id)
        });
      }
      
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating liked jobs:", error);
      alert("Failed to update liked jobs");
    }
  };

  const formattedPostTime = job.postTime?.seconds ? new Date(job.postTime.seconds * 1000).toLocaleDateString() : 'N/A';
     
  const handleCardClick = (e) => {
    if (e.target.closest('.like-button')) {
      return;
    }
    navigate(`/jobinfo/${job.id}`);
  };

  return (
    <div 
      className="find-jobs-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="find-jobs-card-left">
        <img 
          src={companyLogo || '/default-logo.png'} 
          alt={`${companyName} logo`} 
          className="company-logo"
        />
        <div className="job-role-company-container">
          <h3 className="job-role">{job.role}</h3>
          <p className="job-company">{companyName}</p>
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
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default FindJobsCard;
