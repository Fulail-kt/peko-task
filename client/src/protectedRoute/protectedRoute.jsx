import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
  

  const token = localStorage.getItem('peko');

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        console.log('dec',decode)
        setRole(decode.role);

        if (decode.role !== allowedRole) {
          navigate('/sign-in');
        }

      } else {
        // If there's no token, navigate to the login page
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      
    } finally {
      setLoading(false);
    }
  }, [token, navigate, allowedRole]);

  // Render the content based on conditions
  if (loading) {
    return <p>loading</p>;
  }

  if (role === allowedRole ) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;