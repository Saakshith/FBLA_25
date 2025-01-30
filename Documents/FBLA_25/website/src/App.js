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
          <Route path="/jobinfo" element={<JobInfo />} />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/companyportal" element={<CompanyPortal />} />
          <Route path="/adminportal" element={<AdminPortal />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
