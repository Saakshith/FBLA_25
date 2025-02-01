import { Routes, Route } from 'react-router-dom';
import JobInfo from './job_info/JobInfo';

// In your Routes component
<Routes>
  {/* ... other routes ... */}
  <Route path="/job/:jobId" element={<JobInfo />} />
</Routes>