import './App.css';
import StudentLandingPage from "./student_landing_page/StudentLandingPage"
import StudentSignIn from './student_signin/StudentSignIn';
import StudentSignUp from "./student_signup/StudentSignUp"
import FindJobs from "./find_jobs/FindJobs"
import CompanyLandingPage from './company_landing_page/CompanyLandingPage';
import JobInfo from "./job_info/JobInfo"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JobApplication from './job_application/JobApplication';
import CompanyPortal from './company_portal/CompanyPortal';
import AdminPortal from './admin_portal/AdminPortal';
import CreateCompany from './company_portal/create_company/CreateCompany';
import JobDetails from './company_portal/job_details/JobDetails';
import JobCandidates from './company_portal/job_candidates/JobCandidates';
import ForgotPassword from './forgot_password/ForgotPassword';
import CompanyProfile from './company_profile/CompanyProfile';
import ProtectedRoute from './ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import LoadingSpinner from './loading_spinner/LoadingSpinner';

function App() {
  const [user, loading] = useAuthState(auth);

  // List of admin emails
  const adminEmails = [
    'admin@example.com',
    // Add more admin emails as needed
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  // Function to determine redirect path based on user
  const getRedirectPath = () => {
    console.log('Current user:', user?.email);
    console.log('Is admin?', user?.email && adminEmails.includes(user.email));
    
    if (!user) {
      console.log('No user, redirecting to signin');
      return '/signin';
    }
    if (user.email && adminEmails.includes(user.email)) {
      console.log('Admin user, redirecting to admin portal');
      return '/adminportal';
    }
    console.log('Regular user, redirecting to find jobs');
    return '/findjobs';
  };

  // Get the redirect path once for use in routes
  const redirectPath = getRedirectPath();
  console.log('Final redirect path:', redirectPath);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={user ? <Navigate to={redirectPath} /> : <StudentLandingPage />} 
          />
          <Route 
            path="/signin" 
            element={user ? <Navigate to={redirectPath} /> : <StudentSignIn />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to={redirectPath} /> : <StudentSignUp />} 
          />
          <Route 
            path="/forgotpassword" 
            element={user ? <Navigate to={redirectPath} /> : <ForgotPassword />} 
          />
          <Route 
            path="/companylandingpage" 
            element={user ? <Navigate to={redirectPath} /> : <CompanyLandingPage />} 
          />

          {/* Protected routes */}
          <Route
            path="/findjobs"
            element={
              <ProtectedRoute>
                {user?.email && adminEmails.includes(user.email) ? 
                  <Navigate to="/adminportal" /> : 
                  <FindJobs />
                }
              </ProtectedRoute>
            }
          />

          <Route
            path="/adminportal"
            element={
              <ProtectedRoute>
                {user?.email && adminEmails.includes(user.email) ? 
                  <AdminPortal /> : 
                  <Navigate to="/findjobs" />
                }
              </ProtectedRoute>
            }
          />

          {/* Other protected routes */}
          <Route
            path="/jobinfo/:jobId"
            element={
              <ProtectedRoute>
                <JobInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:jobId/apply"
            element={
              <ProtectedRoute>
                <JobApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companyportal/:companyId"
            element={
              <ProtectedRoute>
                <CompanyPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createcompany"
            element={
              <ProtectedRoute>
                <CreateCompany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job/:jobId"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job/:jobId/candidates"
            element={
              <ProtectedRoute>
                <JobCandidates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companyprofile/:companyId"
            element={
              <ProtectedRoute>
                <CompanyProfile />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to={redirectPath} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
