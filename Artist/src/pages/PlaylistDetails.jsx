import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPlaylistDetails } from '../store/actions/musicaction.jsx';

const PlaylistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { playlistDetails, loading, error } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playlistDetails) return <div>No details found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{playlistDetails.title}</h2>
      {/* Render playlist tracks, cover image, etc. */}
      <div>
        {playlistDetails.musics && playlistDetails.musics.length > 0 ? (
          <ul>
            {playlistDetails.musics.map((track) => (
              <li key={track._id}>{track.title}</li>
            ))}
          </ul>
        ) : (
          <p>No tracks in this playlist.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
