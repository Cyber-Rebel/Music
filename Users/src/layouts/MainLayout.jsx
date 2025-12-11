import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useMusicPlayer } from '../contexts/MusicContext';
import { connectSocket, disconnectSocket } from '../socket.service';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentSong } = useMusicPlayer();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Connect socket when MainLayout mounts (user is in the app)
  useEffect(() => {
    const timer = setTimeout(() => {
      connectSocket();
    }, 1);
    
    return () => {
      clearTimeout(timer);
      disconnectSocket();
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Page Content - with bottom padding for player and mobile nav */}
        <main className={`flex-1 overflow-y-auto ${
          currentSong 
            ? 'pb-32 lg:pb-24' // Extra padding on mobile when song is playing
            : 'pb-16 lg:pb-0'   // Just nav padding when no song
        }`}>
          <Outlet />
        </main>
      </div>
      
      {/* Music Player - Fixed at bottom (above mobile nav on mobile) */}
      <MusicPlayer />
      
      {/* Mobile Bottom Navigation - Only show on mobile */}
      {currentSong ? (
        <MobileBottomNav />
      ) : (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <MobileBottomNav />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
