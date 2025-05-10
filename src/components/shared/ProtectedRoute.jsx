import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userType = localStorage.getItem('userType');
  const userData = JSON.parse(localStorage.getItem(userType === 'company' ? 'companyData' : 'userData'));

  if (!userType || !userData) {
    return <Navigate to="/" replace />;
  }

  if (userType !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
