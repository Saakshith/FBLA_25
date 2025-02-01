import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import CompanyNavbar from '../company_navbar/CompanyNavbar';
import './JobCandidates.css';
import LoadingSpinner from '../../loading_spinner/LoadingSpinner';

const JobCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndCandidates = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching job with ID:', jobId);
        // Fetch job details
        const jobDoc = await getDoc(doc(db, 'Jobs', jobId));
        if (!jobDoc.exists()) {
          console.error('Job not found');
          navigate('/company-portal');
          return;
        }
        const jobData = { id: jobDoc.id, ...jobDoc.data() };
        setJob(jobData);
        console.log('Job data:', jobData);

        // Fetch candidates
        const candidatesQuery = query(
          collection(db, 'Applications'),
          where('jobId', '==', doc(db, 'Jobs', jobId))
        );
        const candidatesSnapshot = await getDocs(candidatesQuery);
        console.log('Found candidates:', candidatesSnapshot.size);
        
        if (candidatesSnapshot.empty) {
          console.log('No candidates found');
          setCandidates([]);
          setIsLoading(false);
          return;
        }

        // Fetch detailed user information for each candidate
        const candidatesData = await Promise.all(
          candidatesSnapshot.docs.map(async (application) => {
            const applicationData = application.data();
            console.log('Application data:', applicationData);
            
            try {
              const userDoc = await getDoc(applicationData.userId);
              if (!userDoc.exists()) {
                console.error('User document not found');
                return null;
              }
              
              const userData = userDoc.data();
              console.log('User data:', userData);

              if (!userData) {
                console.error('User data is null');
                return null;
              }

              return {
                id: application.id,
                ...applicationData,
                user: {
                  id: userDoc.id,
                  firstName: userData.firstName || 'Unknown',
                  lastName: userData.lastName || 'User',
                  photo: userData.photo || '/default-avatar.png',
                  email: userData.email || 'No email provided'
                },
                status: applicationData.status || 'Pending',
                appliedDate: applicationData.appliedAt?.toDate() || new Date(),
                resume: applicationData.resume || ''
              };
            } catch (error) {
              console.error('Error fetching user data:', error);
              return null;
            }
          })
        );

        // Filter out null values and set candidates
        const validCandidates = candidatesData.filter(candidate => candidate !== null);
        console.log('Final candidates data:', validCandidates);
        setCandidates(validCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobAndCandidates();
    }
  }, [jobId, navigate]);

  // Add a debug log when candidates state changes
  useEffect(() => {
    console.log('Candidates state updated:', candidates);
  }, [candidates]);

  const handleBackClick = () => {
    if (job?.companyId?.id) {
      navigate(`/companyportal/${job.companyId.id}`);
    } else {
      navigate('/createcompany');
    }
  };

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      const applicationRef = doc(db, 'Applications', candidateId);
      await updateDoc(applicationRef, { status: newStatus });

      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDownloadResume = (resumeUrl, candidateName) => {
    if (!resumeUrl) {
      console.error('No resume URL available');
      return;
    }

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = resumeUrl;
    // Set the download filename to include the candidate's name
    link.download = `${candidateName.replace(/\s+/g, '_')}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='candidates'>
      <div className="candidates-container">
        <CompanyNavbar />
        <div className="candidates-content">
          <div className="candidate-upper">
            <div className="candidates-header">
              <button className="candidate-back-button" onClick={handleBackClick}>
                ← Back to Job
              </button>
            </div>
            <div className='candidate-title'><h1>{job?.role || 'Job'} - Candidates</h1></div>

            <div className="candidates-stats">
              <div className="stat-item">
                <span className="stat-number">{candidates.length}</span>
                <span className="stat-label">Total Candidates</span>
              </div>
            </div>
          </div>

          <div className="candidates-list">
            {isLoading ? (
              <LoadingSpinner />
            ) : candidates && candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="candidate-info">
                    <img 
                      src={candidate.user.photo} 
                      alt={`${candidate.user.firstName} ${candidate.user.lastName}`}
                      className="candidate-avatar"
                    />
                    <div className="candidate-details">
                      <h3>{`${candidate.user.firstName} ${candidate.user.lastName}`}</h3>
                      <p>{candidate.user.email}</p>
                    </div>
                  </div>
                  
                  <div className="candidate-meta">
                    <span className="application-date">
                      Applied {candidate.appliedDate.toLocaleDateString()}
                    </span>
                    <select
                      className="status-dropdown"
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </div>

                  <div className="candidate-actions">
                    <button 
                      className="view-profile-button"
                      onClick={() => navigate(`/job/${jobId}/candidates/${candidate.id}`)}
                    >
                      View Profile
                    </button>
                    <button 
                      className="download-resume-button"
                      onClick={() => handleDownloadResume(candidate.resume, `${candidate.user.firstName} ${candidate.user.lastName}`)}
                    >
                      Download Resume
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-candidates">
                <p>No candidates have applied to this position yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobCandidates;
