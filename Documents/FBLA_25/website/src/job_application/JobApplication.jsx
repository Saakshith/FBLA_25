import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import Navbar from "../find_jobs/navbar_main/NavbarMain";
import "./JobApplication.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../loading_spinner/LoadingSpinner';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("No file chosen");

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const jobDoc = await getDoc(doc(db, 'Jobs', jobId));
        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          setJob(jobData);
          
          // Fetch company name
          const companyDoc = await getDoc(jobData.companyId);
          if (companyDoc.exists()) {
            setCompanyName(companyDoc.data().name);
          }
        } else {
          alert('Job not found!');
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error loading job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.includes('pdf')) {
        alert('Please upload a PDF file');
        return;
      }
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      alert('Please sign in to apply');
      navigate('/login');
      return;
    }

    if (!resumeFile) {
      alert('Please upload your resume');
      return;
    }

    setLoading(true);

    try {
      // Upload resume to Firebase Storage
      const storageRef = ref(storage, `resumes/${auth.currentUser.uid}/${jobId}/${resumeFile.name}`);
      await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(storageRef);

      // Create application document in Firestore
      await addDoc(collection(db, 'Applications'), {
        userId: doc(db, 'Users', auth.currentUser.uid),
        jobId: doc(db, 'Jobs', jobId),
        resume: resumeUrl,
        status: 'pending',
        appliedAt: new Date()
      });

      alert('Application submitted successfully!');
      navigate('/findjobs');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) return <div>Loading...</div>;

  return (
    <div className='application-page'>
      <Navbar />
      <div className='application-container'>
        <div className='application-content'>
          <div className='application-left'>
            <div className='job-overview'>
              <h2>Job Overview</h2>
              {job && (
                <>
                  <div className='job-overview-detail'>
                    <h3>Position</h3>
                    <p>{job.role}</p>
                  </div>
                  <div className='job-overview-detail'>
                    <h3>Company</h3>
                    <p>{companyName}</p>
                  </div>
                  <div className='job-overview-detail'>
                    <h3>Location</h3>
                    <p>{job.location}</p>
                  </div>
                  <div className='job-overview-detail'>
                    <h3>Salary Range</h3>
                    <p>${job.salaryMin} - ${job.salaryMax}</p>
                  </div>
                  <div className='job-overview-detail'>
                    <h3>Job Type</h3>
                    <p>{job.type}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className='application-right'>
            <div className='application-form-container'>
              <h1>Submit Your Application</h1>
              <p className='form-subtitle'>Please upload your resume to apply for this position</p>
              
              <form className="application-form" onSubmit={handleSubmit}>
                <div className="resume-upload-section">
                  <div className="upload-container">
                    <input
                      type="file"
                      id="file-upload"
                      accept=".pdf"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      required
                    />
                    <label htmlFor="file-upload" className="upload-area">
                      <FontAwesomeIcon icon={faCloudUpload} className="upload-icon" />
                      <p className="upload-text">
                        {fileName === "No file chosen" 
                          ? "Drag & drop your resume or click to browse" 
                          : fileName}
                      </p>
                      <p className="upload-requirements">PDF only, max 5MB</p>
                    </label>
                  </div>
                </div>

                <button 
                  className="submit-application-button" 
                  type="submit"
                  disabled={loading || !resumeFile}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;