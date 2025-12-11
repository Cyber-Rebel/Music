import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadMusic from './pages/UploadMusic';
import CreatePlaylist from './pages/CreatePlaylist';
import ArtistProfile from './pages/ArtistProfile';
import ArtistPlaylists from './pages/ArtistPlaylists';
import PlaylistDetails from './pages/PlaylistDetails';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* Public Routes - Redirect to dashboard if already authenticated */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} 
        />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <DashboardLayout>
              <UploadMusic />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/create-playlist" element={
          <ProtectedRoute>
            <DashboardLayout>
              <CreatePlaylist />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Artist Profile Route (Protected) */}
        <Route path="/artist/me" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ArtistProfile />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Artist Playlists Route (Protected) */}
        <Route path="/artist/playlist" element={
          <ProtectedRoute>
            <DashboardLayout>
              <ArtistPlaylists />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Playlist Details Route (Protected) */}
        <Route path="/artist/playlist/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlaylistDetails />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;