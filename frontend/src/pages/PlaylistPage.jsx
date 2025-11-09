import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './PlaylistPage.css';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const { musicPlaylist, myPlaylist, musicdata } = useSelector((state) => ({
    musicPlaylist: state.music.musicPlaylist,
    myPlaylist: state.music.myPlaylist,
    musicdata: state.music.musicdata
  }));

  useEffect(() => {
    // Find playlist from either musicPlaylist or myPlaylist
    let foundPlaylist = null;
    
    if (musicPlaylist && Array.isArray(musicPlaylist)) {
      foundPlaylist = musicPlaylist.find(p => p._id === playlistId || p.id === playlistId);
    }
    
    if (!foundPlaylist && myPlaylist && Array.isArray(myPlaylist)) {
      foundPlaylist = myPlaylist.find(p => p._id === playlistId || p.id === playlistId);
    }

    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      // Set songs from playlist or use all music data
      if (foundPlaylist.songs && Array.isArray(foundPlaylist.songs)) {
        setSongs(foundPlaylist.songs);
      } else if (musicdata && Array.isArray(musicdata)) {
        setSongs(musicdata);
      }
    }
  }, [playlistId, musicPlaylist, myPlaylist, musicdata]);

  const handlePlaySong = (song) => {
    if (currentPlayingSongId === song._id || currentPlayingSongId === song.id) {
      // Toggle play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // Play new song
      setCurrentPlayingSongId(song._id || song.id);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const handleNext = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    setCurrentPlayingSongId(nextSong._id || nextSong.id);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!playlist) {
    return (
      <div className="playlist-page-container">
        <div className="loading">Loading playlist...</div>
      </div>
    );
  }

  const currentSong = songs.find(s => (s._id || s.id) === currentPlayingSongId);
  const currentSongIndex = songs.findIndex(s => (s._id || s.id) === currentPlayingSongId);

  return (
    <div className="playlist-page-container">
      {/* Back Button */}
      <button className="back-button-playlist" onClick={handleBack}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>

      {/* Playlist Header */}
      <div className="playlist-header">
        <div className="playlist-cover">
          {playlist.coverImage || playlist.coverUrl ? (
            <img 
              src={playlist.coverImage || playlist.coverUrl} 
              alt={playlist.title || playlist.name}
            />
          ) : (
            <div className="playlist-cover-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="playlist-info">
          <span className="playlist-type">Playlist</span>
          <h1 className="playlist-title">{playlist.title || playlist.name}</h1>
          <p className="playlist-description">{playlist.description || `${songs.length} songs`}</p>
        </div>
      </div>

      {/* Songs List */}
      <div className="songs-list">
        {songs.length === 0 ? (
          <div className="no-songs">No songs in this playlist</div>
        ) : (
          songs.map((song, index) => {
            const isCurrentSong = (song._id || song.id) === currentPlayingSongId;
            return (
              <div 
                key={song._id || song.id || index} 
                className={`song-row ${isCurrentSong ? 'active' : ''}`}
              >
                {/* Song Image */}
                <div className="song-image-box">
                  {song.albumArt || song.coverImage || song.image ? (
                    <img 
                      src={song.albumArt || song.coverImage || song.image} 
                      alt={song.title || song.name}
                    />
                  ) : (
                    <div className="song-image-placeholder">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Song Name */}
                <div className="song-name">
                  <span className="song-title">{song.title || song.name}</span>
                  <span className="song-artist">{song.artist || song.artistName || 'Unknown Artist'}</span>
                </div>

                {/* Control Buttons */}
                <div className="song-controls">
                  {/* Previous Button */}
                  <button 
                    className="control-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIndex = index - 1 < 0 ? songs.length - 1 : index - 1;
                      const prevSong = songs[prevIndex];
                      setCurrentPlayingSongId(prevSong._id || prevSong.id);
                      setIsPlaying(true);
                      setTimeout(() => audioRef.current?.play(), 100);
                    }}
                    title="Previous"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                  </button>

                  {/* Play/Pause Button */}
                  <button 
                    className="control-btn play-btn"
                    onClick={() => handlePlaySong(song)}
                    title={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
                  >
                    {isCurrentSong && isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Next Button */}
                  <button 
                    className="control-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext(index);
                    }}
                    title="Next"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Hidden Audio Element */}
      {currentSong && (
        <audio 
          ref={audioRef}
          src={currentSong.audioUrl || currentSong.url}
          onEnded={() => handleNext(currentSongIndex)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </div>
  );
};

export default PlaylistPage;
