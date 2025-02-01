import './App.css';
import StudentLandingPage from "./student_landing_page/StudentLandingPage"
import StudentSignIn from './student_signin/StudentSignIn';
import StudentSignUp from "./student_signup/StudentSignUp"
import FindJobs from "./find_jobs/FindJobs"
import CompanyLandingPage from './company_landing_page/CompanyLandingPage';
import JobInfo from "./job_info/JobInfo"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobApplication from './job_application/JobApplication';
import CompanyPortal from './company_portal/CompanyPortal';
import AdminPortal from './admin_portal/AdminPortal';
import CreateCompany from './company_portal/create_company/CreateCompany';
import JobDetails from './company_portal/job_details/JobDetails';
import JobCandidates from './company_portal/job_candidates/JobCandidates';
import ForgotPassword from './forgot_password/ForgotPassword';
import CompanyProfile from './company_profile/CompanyProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLandingPage />} />
          <Route path="/signin" element={<StudentSignIn />} />
          <Route path="/signup" element={<StudentSignUp />} />
          <Route path="/findjobs" element={<FindJobs />} />
          <Route path="/companylandingpage" element={<CompanyLandingPage />} />
          <Route path="/jobinfo/:jobId" element={<JobInfo />} /> {/* Keep only this */}
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/companyportal/:companyId" element={<CompanyPortal />} />
          <Route path="/createcompany" element={<CreateCompany />} />
          <Route path="/adminportal" element={<AdminPortal />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/job/:jobId/candidates" element={<JobCandidates />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/jobs/:jobId/apply" element={<JobApplication />} />
          <Route path="/company_profile" element={<CompanyProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
