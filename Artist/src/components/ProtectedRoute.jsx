import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtistProfile } from '../store/actions/useraction';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Try to fetch user profile if not loaded and not loading
    if (!user && !loading) {
      dispatch(fetchArtistProfile());
    }
  }, [dispatch, user, loading]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-bg-dark)">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-(--color-accent-green) mx-auto mb-4"></div>
          <p className="text-(--color-text-secondary)">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;
