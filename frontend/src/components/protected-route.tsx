
import { useAuthContext } from '@/hooks/authProvider';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext(); // Use isAuthenticated from your useAuth hook

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;