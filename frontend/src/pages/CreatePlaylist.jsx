import React, { useState } from 'react';
import './CreatePlaylist.css';

const CreatePlaylist = () => {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  
  // Sample songs data - Replace with actual API data
  const allSongs = [
    { id: 1, title: 'Song Title 1', artist: 'Artist Name 1', duration: '3:45', image: null },
    { id: 2, title: 'Song Title 2', artist: 'Artist Name 2', duration: '4:20', image: null },
    { id: 3, title: 'Song Title 3', artist: 'Artist Name 3', duration: '2:55', image: null },
    { id: 4, title: 'Song Title 4', artist: 'Artist Name 4', duration: '3:30', image: null },
    { id: 5, title: 'Song Title 5', artist: 'Artist Name 5', duration: '4:15', image: null },
    { id: 6, title: 'Song Title 6', artist: 'Artist Name 6', duration: '3:10', image: null },
    { id: 7, title: 'Song Title 7', artist: 'Artist Name 7', duration: '5:00', image: null },
    { id: 8, title: 'Song Title 8', artist: 'Artist Name 8', duration: '3:25', image: null },
  ];

  const handleSongToggle = (songId) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(selectedSongs.filter(id => id !== songId));
    } else {
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const handleCreatePlaylist = () => {
    if (!playlistTitle.trim()) {
      alert('Please enter a playlist title');
      return;
    }
    if (selectedSongs.length === 0) {
      alert('Please select at least one song');
      return;
    }
    
    const playlistData = {
      title: playlistTitle,
      songs: selectedSongs
    };
    
    console.log('Creating playlist:', playlistData);
    // Add your API call here
  };

  return (
    <div className="create-playlist-container">
      <div className="create-playlist-content">
        {/* Header Section */}
        <div className="playlist-header">
          <button className="back-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <h1 className="page-title">Create Playlist</h1>
        </div>

        {/* Playlist Title Input */}
        <div className="playlist-title-section">
          <div className="title-input-wrapper">
            <label htmlFor="playlist-title">Playlist Title</label>
            <input
              type="text"
              id="playlist-title"
              placeholder="Enter playlist name..."
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
              className="playlist-title-input"
            />
          </div>
          <div className="selected-count">
            {selectedSongs.length} {selectedSongs.length === 1 ? 'song' : 'songs'} selected
          </div>
        </div>

        {/* Songs List */}
        <div className="songs-section">
          <h2 className="section-title">Select Songs</h2>
          <div className="songs-list">
            {allSongs.map((song) => (
              <div 
                key={song.id} 
                className={`song-item ${selectedSongs.includes(song.id) ? 'selected' : ''}`}
              >
                <div className="song-left">
                  <div className="song-image">
                    {song.image ? (
                      <img src={song.image} alt={song.title} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    )}
                  </div>
                  <div className="song-info">
                    <h3 className="song-name">{song.title}</h3>
                    <p className="song-artist">{song.artist}</p>
                  </div>
                </div>

                <div className="song-right">
                  <span className="song-duration">{song.duration}</span>
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => handleSongToggle(song.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="create-button-section">
          <button 
            className="create-playlist-button"
            onClick={handleCreatePlaylist}
            disabled={!playlistTitle.trim() || selectedSongs.length === 0}
          >
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;