import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import ContentSection from '../components/ContentSection';
import MusicCard from '../components/MusicCard';
import './Home.css';

const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoodDetectorOpen, setIsMoodDetectorOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleMoodDetector = () => {
    setIsMoodDetectorOpen(!isMoodDetectorOpen);
  };

  const closeMoodDetector = () => {
    setIsMoodDetectorOpen(false);
  };

  const handlePlay = (songInfo) => {
    console.log('Playing:', songInfo);
    // Add your play logic here
  };

  // Sample data
  const quickPicks = [
    { title: 'Playlist 1', image: null },
    { title: 'Playlist 2', image: null },
    { title: 'Playlist 3', image: null },
    { title: 'Playlist 4', image: null },
    { title: 'Playlist 5', image: null },
    { title: 'Playlist 6', image: null },
  ];

  const madeForYou = [
    { title: 'Daily Mix 1', description: 'Your favorite tracks and more', image: null },
    { title: 'Daily Mix 2', description: 'Your favorite tracks and more', image: null },
    { title: 'Daily Mix 3', description: 'Your favorite tracks and more', image: null },
    { title: 'Daily Mix 4', description: 'Your favorite tracks and more', image: null },
    { title: 'Daily Mix 5', description: 'Your favorite tracks and more', image: null },
  ];

  const recentlyPlayed = [
    { title: 'Song 1', description: 'Artist Name', image: null },
    { title: 'Song 2', description: 'Artist Name', image: null },
    { title: 'Song 3', description: 'Artist Name', image: null },
    { title: 'Song 4', description: 'Artist Name', image: null },
    { title: 'Song 5', description: 'Artist Name', image: null },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="home-container">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} currentSong={currentSong} />

      {/* Main Content */}
      <main className={`main-content ${isMoodDetectorOpen ? 'blurred' : ''}`}>
        {/* Header with Profile */}
        <Header onMenuClick={toggleSidebar} />

        {/* Content Area */}
        <div className="content-area">
          <WelcomeSection 
            greeting={getGreeting()} 
            quickPicks={quickPicks}
          />

          <ContentSection 
            title="Made for you"
            onSeeAll={() => console.log('See all Made for you')}
          >
            {madeForYou.map((item, index) => (
              <MusicCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                onPlay={() => handlePlay(item)}
              />
            ))}
          </ContentSection>

          <ContentSection 
            title="Recently played"
            onSeeAll={() => console.log('See all Recently played')}
          >
            {recentlyPlayed.map((item, index) => (
              <MusicCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                onPlay={() => handlePlay(item)}
              />
            ))}
          </ContentSection>
        </div>
      </main>

      {/* Floating Plus Button */}
      <button 
        className="floating-plus-button" 
        onClick={toggleMoodDetector}
        title="Mood Detector"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>

      {/* Mood Detector Modal */}
      {isMoodDetectorOpen && (
        <div className="mood-detector-modal">
          <div className="modal-overlay" onClick={closeMoodDetector}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Mood Detector</h2>
              <button className="close-modal-button" onClick={closeMoodDetector}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <iframe 
                src="http://localhost:5174" 
                title="Mood Detector"
                className="mood-detector-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;