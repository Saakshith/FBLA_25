import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs, getCountFromServer } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarMain from '../find_jobs/navbar_main/NavbarMain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faDollarSign, faBriefcase, faUsers } from '@fortawesome/free-solid-svg-icons';
import "./JobInfo.css";
import LoadingSpinner from '../loading_spinner/LoadingSpinner';

const JobInfo = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobAndCompany = async () => {
      try {
        const jobRef = doc(db, 'Jobs', jobId);
        const jobDoc = await getDoc(jobRef);
        
        if (jobDoc.exists()) {
          const jobData = jobDoc.data();

          // Get application count for this job
          const applicationsQuery = query(
            collection(db, "Applications"),
            where("jobId", "==", jobRef)
          );
          const applicationsSnapshot = await getCountFromServer(applicationsQuery);
          setApplicantsCount(applicationsSnapshot.data().count);
          
          setJob(jobData);
          
          // Fetch company details
          const companyDoc = await getDoc(jobData.companyId);
          if (companyDoc.exists()) {
            setCompanyDetails(companyDoc.data());
          }

          // Check if current user has applied
          if (auth.currentUser) {
            const userApplicationQuery = query(
              collection(db, "Applications"),
              where("jobId", "==", jobRef),
              where("userId", "==", doc(db, "Users", auth.currentUser.uid))
            );
            const userApplicationSnapshot = await getDocs(userApplicationQuery);
            setHasApplied(!userApplicationSnapshot.empty);
          }
        } else {
          console.error('Job not found');
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndCompany();
  }, [jobId, navigate]);

  if (loading || !job || !companyDetails) {
    return <LoadingSpinner />;
  }

  const formattedPostTime = job.postTime?.seconds ? 
    new Date(job.postTime.seconds * 1000).toLocaleDateString() : 'N/A';
  
  const formattedEndTime = job.endTime?.seconds ? 
    new Date(job.endTime.seconds * 1000).toLocaleDateString() : 'N/A';

  return (
    <div className="job-info-page">
      <div className='job-info-main'>
      <NavbarMain />
      <div className="job-info-container">
        <div className="job-info-header">
          <div className="job-info-company">
            <img 
              src={companyDetails.logoUrl || '/default-logo.png'} 
              alt={companyDetails.name} 
              className="company-logo"
            />
            <div className="company-info">
              <h1>{job.role}</h1>
              <h2>{companyDetails.name}</h2>
            </div>
          </div>
          <button 
            className={`apply-button ${hasApplied ? 'applied' : ''}`}
            onClick={() => !hasApplied && navigate(`/jobs/${jobId}/apply`)}
            disabled={hasApplied}
          >
            {hasApplied ? 'Applied' : 'Apply Now'}
          </button>
        </div>

        <div className="job-details-grid">
          <div className="detail-item">
            <FontAwesomeIcon icon={faLocationDot} />
            <div>
              <h3>Location</h3>
              <p>{job.location}</p>
            </div>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faDollarSign} />
            <div>
              <h3>Salary Range</h3>
              <p>${job.salaryMin} - ${job.salaryMax} per hour</p>
            </div>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faBriefcase} />
            <div>
              <h3>Job Type</h3>
              <p>{job.type}</p>
            </div>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faUsers} />
            <div>
              <h3>Applicants</h3>
              <p>{applicantsCount} Applied</p>
            </div>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faClock} />
            <div>
              <h3>Posted Date</h3>
              <p>{formattedPostTime}</p>
            </div>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faClock} />
            <div>
              <h3>Application Deadline</h3>
              <p>{formattedEndTime}</p>
            </div>
          </div>
        </div>

        <div className="job-description">
          <h2>Job Description</h2>
          <div className="description-content">
            {job.description}
          </div>
        </div>

        <div className="company-section">
          <h2>About {companyDetails.name}</h2>
          <p>{companyDetails.about}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default JobInfo;