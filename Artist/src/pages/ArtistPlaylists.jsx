import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistPlaylists } from '../store/actions/musicaction.jsx';
import { Link } from 'react-router-dom';

const ArtistPlaylists = () => {
  const dispatch = useDispatch();
  const { playlists, loading, error } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchArtistPlaylists());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playlists.map((playlist) => (
          <Link key={playlist._id} to={`/artist/playlist/${playlist._id}`} className="block bg-white rounded-lg shadow p-4 hover:bg-gray-100">
            <h3 className="text-lg font-semibold">{playlist.title}</h3>
            {/* Add cover image and more info if available */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistPlaylists;
