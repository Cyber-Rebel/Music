import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';
import { connectSocket, disconnectSocket } from '../socket.service';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        {/* Page Content - with bottom padding for player */}
        <main className="flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>
      </div>
      
      {/* Music Player - Fixed at bottom */}
      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
