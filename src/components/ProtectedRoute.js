import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setShowSnackbar(true);
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/login" replace />
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="warning" 
            sx={{ width: '100%' }}
          >
            You need to login first to view this page
          </Alert>
        </Snackbar>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;