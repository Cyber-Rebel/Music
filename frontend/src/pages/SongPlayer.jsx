import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SongPlayer.css';

const SongPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { musicdata } = useSelector(state => state.music);
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (musicdata && id) {
      const foundSong = musicdata.find(s => s._id === id);
      if (foundSong) {
        setSong(foundSong);
        // Auto-play when song loads
        if (audioRef.current && foundSong.musicUrl) {
          audioRef.current.src = foundSong.musicUrl;
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error('Error playing audio:', error));
        }
      }
    }
  }, [id, musicdata]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error('Error playing audio:', error));
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (musicdata && musicdata.length > 0) {
      const currentIndex = musicdata.findIndex(s => s._id === id);
      if (currentIndex !== -1 && currentIndex < musicdata.length - 1) {
        const nextSong = musicdata[currentIndex + 1];
        navigate(`/song/${nextSong._id}`);
      } else {
        // If at the end, loop to the first song
        navigate(`/song/${musicdata[0]._id}`);
      }
    }
  };

  const handlePrevious = () => {
    if (musicdata && musicdata.length > 0) {
      const currentIndex = musicdata.findIndex(s => s._id === id);
      if (currentIndex > 0) {
        const previousSong = musicdata[currentIndex - 1];
        navigate(`/song/${previousSong._id}`);
      } else {
        // If at the beginning, loop to the last song
        navigate(`/song/${musicdata[musicdata.length - 1]._id}`);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      audioRef.current.currentTime = clickPosition * duration;
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    // Add your like/unlike API call here
    console.log('Song liked:', !isLiked);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!song) {
    return (
      <div className="song-player-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="song-player-container">
      {/* Audio Element */}
      <audio 
        ref={audioRef}
        onEnded={handleNext}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Back Button */}
      <button className="back-button-player" onClick={handleBack}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Back</span>
      </button>

      {/* Main Player Content */}
      <div className="player-content">
        {/* Album/Cover Image */}
        <div className="album-art-container">
          {song.coverUrl ? (
            <img src={song.coverUrl} alt={song.title} className="album-art" />
          ) : (
            <div className="album-art-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="song-info-player">
          <h1 className="song-title-player">{song.title}</h1>
          <p className="artist-name-player">{song.artist}</p>
        </div>
        {/* Progress Bar */}
        <div className="progress-container">
          <span className="time-current">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div 
              className="progress-fill" 
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="progress-handle"></div>
            </div>
          </div>
          <span className="time-total">{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="playback-controls">
          <button className="control-button" onClick={handlePrevious} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          <button 
            className="play-pause-button" 
            onClick={handlePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button className="control-button" onClick={handleNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className={`action-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeToggle}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>
          
          
        </div>

       
        
      </div>
    </div>
  );
};

export default SongPlayer;
