import React from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard';

const MyPlaylistSection = ({ playlists, onPlaylistClick }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = (playlist) => {
    if (onPlaylistClick) {
      onPlaylistClick(playlist);
    }
    navigate(`/playlist/${playlist._id || playlist.id}`);
  };

  return (
    <div className="my-playlist-section">
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist) => (
          <MusicCard
            key={playlist._id}
            title={playlist.title || playlist.name}
            description={playlist.description || `${playlist.songs?.length || 0} songs`}
            image={playlist.coverUrl || playlist.coverImage}
            onPlay={() => handlePlaylistClick(playlist)}
            isPlaying={false}
          />
        ))
      ) : (
        <div className="empty-playlist-message">
          <p>No playlists yet</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Create your first playlist to get started</p>
        </div>
      )}
    </div>
  );
};

export default MyPlaylistSection;
