import { Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import LoadingSpinner from './loading_spinner/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = auth.currentUser;

  if (!user) {
    // Redirect to signin while saving the attempted URL
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
