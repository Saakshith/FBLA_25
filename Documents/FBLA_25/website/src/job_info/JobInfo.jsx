// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase'; // Adjust path as needed
// import Navbar from "../../navbar/navbar";
// import "./jobInfo.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { useParams, useNavigate } from 'react-router-dom';
// import FroalaView from 'react-froala-wysiwyg/FroalaEditorView';
// import LoadingPage from '../../loading/LoadingPage';

// const JobInfo = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJob = async () => {
//       const jobRef = doc(db, 'Jobs', jobId);
//       const jobSnapshot = await getDoc(jobRef);
//       if (jobSnapshot.exists()) {
//         setJob(jobSnapshot.data());
//       } else {
//         console.log('No such job!');
//       }
//     };

//     fetchJob();
//   }, [jobId]);

//   if (!job) {
//     return <LoadingPage message='Loading...'/>;
//   }

//   // Safely access applicants and default to 0 if not available
//   const applicantsCount = Array.isArray(job.applicants) ? job.applicants.length : 0;

//   return (
//     <div>
//       <Navbar />
//       <div className="job-info">
//         <div className="job-info-title-apply-container">
//           <h1 className="job-info-title">{job.title}</h1>
//           <button
//             className="job-info-apply-button"
//             onClick={() => navigate(`/jobs/jobInfo/${jobId}/apply`)}
//           >
//             Apply
//           </button>
//         </div>
//         <div className="job-info-company-details-container">
//           <div className="job-info-company-logo-container">
//             <img src={job.logoURL} alt="" />
//             <h3>{job.company}</h3>
//           </div>
//           <div className="job-info-company-details">
//             <div className="job-info-company-detail">
//               <FontAwesomeIcon icon={faLocationDot} />
//               <p>{job.locationCity}, {job.locationState}</p>
//             </div>
//             <div className="job-info-company-detail">
//               <p>${job.payMin} - ${job.payMax} per hour</p>
//             </div>
//             <div className="job-info-company-detail">
//               <p>{applicantsCount} Applicants</p> {/* Safely use applicantsCount */}
//             </div>
//           </div>
//         </div>
//         <div className="job-info-description">
//           <FroalaView model={job.description}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobInfo;