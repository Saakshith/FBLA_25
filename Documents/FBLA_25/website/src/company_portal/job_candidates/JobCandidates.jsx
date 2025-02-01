import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
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

  if (isLoading) {
    return <div className="candidates-loading">Loading...</div>;
  }

  return (
    <section className='candidates'>
    <div className="candidates-container">
      <CompanyNavbar />
      <div className="candidates-content">
        <div className="candidate-upper">
          <div className="candidates-header">
            <button className="candidate-back-button" onClick={() => navigate(`/job/${jobId}`)}>
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
                  <select
                    className="status-dropdown"
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                  >
                    <option value="Pending" disabled>Pending</option>
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
                  <button className="download-resume-button" id='resume'>
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
