import React, { useState } from 'react';
import './UploadSongs.css';

const UploadSongs = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    coverImageUrl: '',
    audioFile: null
  });
  
  const [audioFileName, setAudioFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({
          ...prev,
          audioFile: file
        }));
        setAudioFileName(file.name);
      } else {
        alert('Please select a valid audio file');
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({
          ...prev,
          audioFile: file
        }));
        setAudioFileName(file.name);
      } else {
        alert('Please drop a valid audio file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a song title');
      return;
    }

    if (!formData.audioFile) {
      alert('Please select an audio file');
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Create FormData for file upload
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('artist', formData.artist);
    uploadData.append('album', formData.album);
    uploadData.append('coverImageUrl', formData.coverImageUrl);
    uploadData.append('audioFile', formData.audioFile);

    console.log('Uploading song:', {
      title: formData.title,
      artist: formData.artist,
      album: formData.album,
      coverImageUrl: formData.coverImageUrl,
      audioFile: formData.audioFile.name
    });

    // Add your API call here
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      alert('Song uploaded successfully!');
      // Reset form
      setFormData({
        title: '',
        artist: '',
        album: '',
        coverImageUrl: '',
        audioFile: null
      });
      setAudioFileName('');
    }, 2000);
  };

  const handleClear = () => {
    setFormData({
      title: '',
      artist: '',
      album: '',
      coverImageUrl: '',
      audioFile: null
    });
    setAudioFileName('');
  };

  return (
    <div className="upload-songs-container">
      <div className="upload-songs-content">
        {/* Header */}
        <div className="upload-header">
          <button className="back-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <h1 className="page-title">Upload Song</h1>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-grid">
            {/* Left Column - Form Fields */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">Song Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter song title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="artist">Artist Name</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  placeholder="Enter artist name"
                  value={formData.artist}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="album">Album Name</label>
                <input
                  type="text"
                  id="album"
                  name="album"
                  placeholder="Enter album name"
                  value={formData.album}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverImageUrl">Cover Image URL</label>
                <input
                  type="url"
                  id="coverImageUrl"
                  name="coverImageUrl"
                  placeholder="https://example.com/cover.jpg"
                  value={formData.coverImageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Right Column - Image Preview */}
            <div className="form-column">
              <div className="cover-preview-section">
                <label>Cover Preview</label>
                <div className="cover-preview">
                  {formData.coverImageUrl ? (
                    <img 
                      src={formData.coverImageUrl} 
                      alt="Cover preview" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="cover-placeholder" style={formData.coverImageUrl ? {display: 'none'} : {}}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <span>Cover Image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audio File Upload */}
          <div className="audio-upload-section">
            <label>Audio File *</label>
            <div 
              className={`audio-drop-zone ${isDragging ? 'dragging' : ''} ${audioFileName ? 'has-file' : ''}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="audioFile"
                accept="audio/*"
                onChange={handleFileChange}
                className="file-input"
              />
              
              {audioFileName ? (
                <div className="file-selected">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  <div className="file-info">
                    <p className="file-name">{audioFileName}</p>
                    <p className="file-size">{(formData.audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, audioFile: null }));
                      setAudioFileName('');
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <label htmlFor="audioFile" className="drop-zone-content">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                  <p className="drop-zone-title">Drag & drop audio file here</p>
                  <p className="drop-zone-subtitle">or click to browse</p>
                  <span className="file-formats">Supported: MP3, WAV, FLAC, OGG</span>
                </label>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className="clear-button"
              onClick={handleClear}
              disabled={isUploading}
            >
              Clear
            </button>
            <button 
              type="submit" 
              className="upload-button"
              disabled={isUploading || !formData.title || !formData.audioFile}
            >
              {isUploading ? 'Uploading...' : 'Upload Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSongs;