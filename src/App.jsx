import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectRoute from './protectRoute';
import { Dashboard } from './modules/jobs/Dashboard';
import { JobPostDetails } from './modules/jobs/JobDetails';
import GuestRoute from './AuthRoutes';
import { JobApplication } from './modules/application/JobApplication';
import { LoginSignupPage } from './modules/auth/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <LoginSignupPage />
            </GuestRoute>
          }
        />
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs/:jobId" element={<JobPostDetails />} />
          <Route path="/jobs/:jobId/application" element={<JobApplication />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
