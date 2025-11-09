import React from 'react';

const MusicCard = ({ title, description, image, onPlay }) => {
  return (
    <div className="music-card">
      <div className="card-image" style={image ? { backgroundImage: `url(${image})` } : {}}>
        <button className="play-button" onClick={onPlay}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default MusicCard;
