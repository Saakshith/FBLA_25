import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import CompanyNavbar from '../company_navbar/CompanyNavbar';
import './JobCandidates.css';

const JobCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndCandidates = async () => {
      try {
        // Fetch job details
        const jobDoc = await getDoc(doc(db, 'Jobs', jobId));
        if (!jobDoc.exists()) {
          console.error('Job not found');
          navigate('/company-portal');
          return;
        }
        setJob({ id: jobDoc.id, ...jobDoc.data() });

        // Fetch candidates
        const candidatesQuery = query(
          collection(db, 'Applications'),
          where('jobId', '==', doc(db, 'Jobs', jobId))
        );
        const candidatesSnapshot = await getDocs(candidatesQuery);
        
        // Fetch detailed user information for each candidate
        const candidatesData = await Promise.all(
          candidatesSnapshot.docs.map(async (application) => {
            const userData = await getDoc(application.data().userId);
            return {
              id: application.id,
              ...application.data(),
              user: { id: userData.id, ...userData.data() },
              status: application.data().status || 'Pending',
              appliedDate: application.data().timestamp?.toDate() || new Date(),
            };
          })
        );

        setCandidates(candidatesData);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndCandidates();
  }, [jobId, navigate]);

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'status-pending',
      'Reviewing': 'status-reviewing',
      'Interviewed': 'status-interviewed',
      'Accepted': 'status-accepted',
      'Rejected': 'status-rejected'
    };
    return statusColors[status] || 'status-pending';
  };

  if (isLoading) {
    return <div className="candidates-loading">Loading...</div>;
  }

  return (
    <div className="candidates-container">
      <CompanyNavbar />
      <div className="candidates-content">
        <div className="candidates-header">
          <button className="back-button" onClick={() => navigate(`/job/${jobId}`)}>
            ← Back to Job
          </button>
          <h1>{job?.role || 'Job'} - Candidates</h1>
        </div>

        <div className="candidates-stats">
          <div className="stat-item">
            <span className="stat-number">{candidates.length}</span>
            <span className="stat-label">Total Candidates</span>
          </div>
          {/* Add more stats as needed */}
        </div>

        <div className="candidates-list">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-info">
                  <img 
                    src={candidate.user.profileImage || '/default-avatar.png'} 
                    alt={candidate.user.name}
                    className="candidate-avatar"
                  />
                  <div className="candidate-details">
                    <h3>{candidate.user.name}</h3>
                    <p>{candidate.user.title || 'No title provided'}</p>
                  </div>
                </div>
                
                <div className="candidate-meta">
                  <span className="application-date">
                    Applied {candidate.appliedDate.toLocaleDateString()}
                  </span>
                  <span className={`application-status ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </div>

                <div className="candidate-actions">
                  <button 
                    className="view-profile-button"
                    onClick={() => navigate(`/job/${jobId}/candidates/${candidate.id}`)}
                  >
                    View Profile
                  </button>
                  <button className="download-resume-button">
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
  );
};

export default JobCandidates; 