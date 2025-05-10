import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ allowedType, children }) => {
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    if (!userType || userType !== allowedType) {
      toast.error("❌ You are not authorized to access this page!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, []);

  if (!userType || userType !== allowedType) {
    return (
      <>
        <ToastContainer />
        <Navigate to="/" replace />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ProtectedRoute;
