import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
//import { db, storage } from '../../firebase'; // Make sure firebase.js exports storage
//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from "../find_jobs/navbar_main/NavbarMain";
import "./JobApplication.css";
//11import LoadingPage from '../../loading/LoadingPage';
import heroImg from '../images/apply_img.png'

const JobApplication = () => {
  // const { jobId } = useParams();
  // const [job, setJob] = useState(null);
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipCode: ''
  // });
  // const [resumeFile, setResumeFile] = useState(null);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     const jobRef = doc(db, 'Jobs', jobId);
  //     const jobSnapshot = await getDoc(jobRef);
  //     if (jobSnapshot.exists()) {
  //       setJob(jobSnapshot.data());
  //     } else {
  //       console.log('No such job!');
  //     }
  //   };

  //   fetchJob();
  // }, [jobId]);

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const handleFileChange = (e) => {
  //   setResumeFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!resumeFile) {
  //     alert("Please upload a resume.");
  //     return;
  //   }
  
  //   try {
  //     // Upload resume to Firebase Storage
  //     const resumeRef = ref(storage, `resumes/${jobId}/${formData.firstName}_${formData.lastName}_${resumeFile.name}`);
  //     await uploadBytes(resumeRef, resumeFile);
  
  //     // Get the download URL for the resume
  //     const resumeUrl = await getDownloadURL(resumeRef);
  
  //     // Add applicant data to the job document in Firestore
  //     const jobRef = doc(db, 'Jobs', jobId);
  //     await updateDoc(jobRef, {
  //       applicants: arrayUnion({
  //         ...formData,
  //         resumeUrl,
  //         status: 'pending' // Add status as pending
  //       })
  //     });
  
  //     alert("Application submitted successfully!");
  //     // Clear the form after submission
  //     setFormData({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       phone: '',
  //       address: '',
  //       city: '',
  //       state: '',
  //       zipCode: ''
  //     });
  //     setResumeFile(null);
  //     window.location.href = "/jobs"; // Redirect to jobs page
  //   } catch (error) {
  //     console.error("Error submitting application:", error);
  //     alert("Failed to submit the application. Please try again.");
  //   }
  // };
  

  // if (!job) {
  //   return <LoadingPage message="Loading..."/>
  // }

  return (
    <section className='apply'>
      <Navbar />
      <div className='main'>
      <div className='apply-left'>
        <img src={heroImg} alt="Applying for a job" />
      </div>
      <div className='apply-right'>
        <div className="apply-main">
          <div className="apply-title-container">
            <h1 className="apply-title">Apply for JOB AT COMPANY</h1>
          </div>
          <div className="apply-form-container">
            <form className="apply-form">
              <div className="apply-form-row">
                <label>First Name</label>
                <input required type="text" name="firstName" placeholder="John" />
              </div>
              <div className="apply-form-row">
                <label>Last Name</label>
                <input required type="text" name="lastName" placeholder="Doe" />
              </div>
              <div className="apply-form-row">
                <label>Email</label>
                <input required type="email" name="email" placeholder="johndoe@gmail.com" />
              </div>
              <div className="apply-form-row">
                <label>Phone Number</label>
                <input required type="text" name="phone" placeholder="425-123-4567" />
              </div>
              <div className="apply-form-row">
                <label>Street Address</label>
                <input required type="text" name="address" placeholder="123 45th Ave SE" />
              </div>
              <div className="apply-form-row-split-container">
                <div className="apply-form-row-split">
                  <label>City</label>
                  <input required type="text" name="city" placeholder="City" />
                </div>
                <div className="apply-form-row-split">
                  <label>State</label>
                  <select name="state">
                    <option value="">--Select State--</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
                <div className="apply-form-row-split">
                  <label>ZIP Code</label>
                  <input required type="text" name="zipCode" placeholder="00000" />
                </div>
              </div>
              <div className="apply-form-row apply-upload-resume-row">
                <label>Upload Resume</label>
                <div className="custom-file-upload">
                  <input
                    type="file"
                    id="file-upload"
                    name="resume"
                    style={{ display: 'none' }}
                    required
                  />
                  <label htmlFor="file-upload" className="job-info-apply-button file-upload-button">
                    Choose File
                  </label>
                  <span id="file-name" className="file-name">No file chosen</span>
                </div>
              </div>
              <button className="job-info-apply-button" type="submit">Apply</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>

  );
};

export default JobApplication;