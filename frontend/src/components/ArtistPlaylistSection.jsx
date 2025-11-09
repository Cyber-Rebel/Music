import React from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard';

const ArtistPlaylistSection = ({ artists, onArtistClick }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = (artist) => {
    if (onArtistClick) {
      onArtistClick(artist);
    }
    navigate(`/playlist/${artist._id || artist.id}`);
  };

  return (
    <div className="artist-playlist-section">
      {artists && artists.length > 0 ? (
        artists.map((artist) => (
          <MusicCard
            key={artist._id}
            title={artist.name || artist.title}
            description={`${artist.songCount || 0} songs`}
            image={artist.image || artist.coverUrl}
            onPlay={() => handlePlaylistClick(artist)}
            isPlaying={false}
          />
        ))
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>No artists available</p>
      )}
    </div>
  );
};

export default ArtistPlaylistSection;
