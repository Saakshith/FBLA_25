import './App.css';
import StudentLandingPage from "./student_landing_page/StudentLandingPage"
import StudentSignIn from './student_signin/StudentSignIn';
import StudentSignUp from "./student_signup/StudentSignUp"
import FindJobs from "./find_jobs/FindJobs"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLandingPage />} />
          <Route path="/signin" element={<StudentSignIn />} />
          <Route path="/signup" element={<StudentSignUp />} />
          <Route path="/findjobs" element={<FindJobs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
