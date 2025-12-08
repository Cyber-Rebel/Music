import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadMusic from './pages/UploadMusic';
import CreatePlaylist from './pages/CreatePlaylist';

import ArtistProfile from './pages/ArtistProfile';
import ArtistPlaylists from './pages/ArtistPlaylists';
import PlaylistDetails from './pages/PlaylistDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        <Route path="/upload" element={
          <DashboardLayout>
            <UploadMusic />
          </DashboardLayout>
        } />
        <Route path="/create-playlist" element={
          <DashboardLayout>
            <CreatePlaylist />
          </DashboardLayout>
        } />

        {/* Artist Profile Route (Protected) */}
        <Route path="/artist/me" element={
          <DashboardLayout>
            <ArtistProfile />
          </DashboardLayout>
        } />

        {/* Artist Playlists Route (Protected) */}
        <Route path="/artist/playlist" element={
          <DashboardLayout>
            <ArtistPlaylists />
          </DashboardLayout>
        } />

        {/* Playlist Details Route (Protected) */}
        <Route path="/artist/playlist/:id" element={
          <DashboardLayout>
            <PlaylistDetails />
          </DashboardLayout>
        } />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;