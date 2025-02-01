import React, { useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './CreateJobPopup.css';

const CreateJobPopup = ({ isOpen, closePopup, companyId, createdBy }) => {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryMin, setSalaryMin] = useState(15);
  const [salaryMax, setSalaryMax] = useState(22);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('In-Person');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!jobRole || !jobDescription || !location || !type || !endTime) {
      alert('Please fill in all required fields.');
      return;
    }

    if (salaryMin > salaryMax) {
      alert('Minimum salary cannot be greater than maximum salary.');
      return;
    }

    try {
      setIsSubmitting(true);
      const jobData = {
        role: jobRole,
        description: jobDescription,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        location,
        type,
        status: 'Pending',
        applicants: 0,
        companyId: doc(db, 'Companies', companyId),
        createdBy: doc(db, 'Users', createdBy),
        postTime: new Date(),
        endTime: new Date(endTime)
      };

      await addDoc(collection(db, 'Jobs'), jobData);
      
      // Reset form
      setJobRole('');
      setJobDescription('');
      setSalaryMin(15);
      setSalaryMax(22);
      setLocation('');
      setType('In-Person');
      setEndTime('');
      
      closePopup();
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`popup-overlay ${isOpen ? 'open' : ''}`}>
      <div className="popup-container">
        <button className="close-popup" onClick={closePopup}>×</button>
        <h2>Create New Job Position</h2>
        <div className="popup-form">
          <div className="form-group">
            <label htmlFor="jobRole">Job Role *</label>
            <input
              id="jobRole"
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription">Job Description *</label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows="6"
            />
          </div>

          <div className="salary-range">
            <div className="form-group">
              <label htmlFor="salaryMin">Min Salary ($/hr) *</label>
              <input
                id="salaryMin"
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                min="12"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salaryMax">Max Salary ($/hr) *</label>
              <input
                id="salaryMax"
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                min="12"
                max="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, NY"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Work Type *</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="In-Person">In-Person</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="endTime">Application Deadline *</label>
            <input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-actions">
            <button 
              className="popup-cancel-button" 
              onClick={closePopup}
              type="button"
            >
              Cancel
            </button>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPopup;
