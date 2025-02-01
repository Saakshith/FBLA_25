import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import CompanyNavbar from '../company_navbar/CompanyNavbar';
import './JobDetails.css';
import LoadingSpinner from '../../loading_spinner/LoadingSpinner';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = await getDoc(doc(db, 'Jobs', jobId));
        if (jobDoc.exists()) {
          const jobData = { id: jobDoc.id, ...jobDoc.data() };
          setJob(jobData);
          setEditedJob(jobData);
        } else {
          console.error('Job not found');
          navigate('/company-portal');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const jobRef = doc(db, 'Jobs', jobId);
      
      // Only update the fields that have changed
      const updates = {};
      if (editedJob.role !== job.role) updates.role = editedJob.role;
      if (editedJob.description !== job.description) updates.description = editedJob.description;
      if (editedJob.location !== job.location) updates.location = editedJob.location;
      if (editedJob.workType !== job.workType) updates.workType = editedJob.workType;
      if (editedJob.status !== job.status) updates.status = editedJob.status;
      if (Number(editedJob.minSalary) !== job.minSalary) updates.minSalary = Number(editedJob.minSalary);
      if (Number(editedJob.maxSalary) !== job.maxSalary) updates.maxSalary = Number(editedJob.maxSalary);

      if (Object.keys(updates).length > 0) {
        await updateDoc(jobRef, updates);
        setJob({ ...job, ...updates });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteDoc(doc(db, 'Jobs', jobId));
        navigate(`/companyportal/${job.companyId}`, { replace: true });
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return <div className="job-details-error">Job not found</div>;
  }

  return (
    <section className="job-details">
    <div className="job-details-container">
      <CompanyNavbar />
      <div className="job-details-content">
        <div className="job-details-header">
          <button className="details-back-button" onClick={() => navigate(`/companyportal/${job.companyId}`)}>
            ← Back to Jobs
          </button>
          <div className="job-details-actions">
            {!isEditing && (
              <>
                <button className="edit-button" onClick={handleEdit}>
                  Edit Job
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete Job
                </button>
              </>
            )}
          </div>
        </div>

        <div className="job-details-main">
          {isEditing ? (
            <div className="job-edit-form">
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={editedJob.role}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editedJob.description}
                  onChange={handleChange}
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editedJob.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Work Type</label>
                <select
                  name="workType"
                  value={editedJob.workType}
                  onChange={handleChange}
                >
                  <option value="In-Person">In-Person</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editedJob.status}
                  onChange={handleChange}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="salary-range">
                <div className="form-group">
                  <label>Min Salary</label>
                  <input
                    type="number"
                    name="minSalary"
                    value={editedJob.minSalary}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Max Salary</label>
                  <input
                    type="number"
                    name="maxSalary"
                    value={editedJob.maxSalary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-actions">
                <button className="edit-cancel-button" id="cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="job-details-info">
              <h1>{job.role || 'Untitled Role'}</h1>
              <div className="job-meta">
                <span className="company-job-card-detail">{job.location || 'No location specified'}</span>
                <span className="company-job-card-detail">{job.workType || 'Not specified'}</span>
                {/* <span className={`job-status status-${(job.status || 'draft').toLowerCase()}`}>
                  {job.status || 'Draft'}
                </span> */}
                <span className="company-job-card-detail">${(job.minSalary || 0).toLocaleString()} - ${(job.maxSalary || 0).toLocaleString()} per year</span>
              </div>
              <div className="job-description">
                <h2>Description</h2>
                <p>{job.description || 'No description available'}</p>
              </div>
              <div className="job-dates">
                {job.postTime && (
                  <p>Posted: {job.postTime.toDate().toLocaleDateString()}</p>
                )}
                {job.endTime && (
                  <p>Deadline: {job.endTime.toDate().toLocaleDateString()}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  );
};

export default JobDetails; 