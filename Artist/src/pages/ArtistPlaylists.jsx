import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistPlaylists } from '../store/actions/musicaction.jsx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ListMusic, Plus, Music2, Play, Clock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const ArtistPlaylists = () => {
  const dispatch = useDispatch();
  const { artistTracks: playlists, loading, error } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchArtistPlaylists());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ListMusic className="text-(--color-accent-green)" size={28} />
            My Playlists
          </h1>
          <p className="text-(--color-text-secondary) text-sm sm:text-base">
            Manage and organize your music collections
          </p>
        </div>
        <Link to="/create-playlist" className="w-full sm:w-auto">
          <Button variant="primary" className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus size={20} />
            Create New Playlist
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-accent-green)"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-6 bg-red-500/10 border-red-500/20">
          <p className="text-red-400 text-center">{error}</p>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && playlists.length === 0 && (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-(--color-card-hover) rounded-full flex items-center justify-center">
              <Music2 size={40} className="text-(--color-text-secondary)" />
            </div>
            <h3 className="text-xl font-bold text-white">No Playlists Yet</h3>
            <p className="text-(--color-text-secondary) max-w-md">
              Create your first playlist to organize your music and share with your fans.
            </p>
            <Link to="/create-playlist">
              <Button variant="primary" className="mt-4">
                <Plus size={20} />
                Create Your First Playlist
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Playlists Grid */}
      {!loading && !error && playlists.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={`/artist/playlist/${playlist._id}`}>
                <Card
                  hover
                  className="group cursor-pointer overflow-hidden p-0 h-full"
                >
                  {/* Playlist Cover */}
                  <div className="relative aspect-square overflow-hidden bg-(--color-card-hover)">
                    {playlist.coverUrl ? (
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music2 size={64} className="text-(--color-text-secondary)" />
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full bg-(--color-accent-green) flex items-center justify-center cursor-pointer"
                      >
                        <Play size={24} className="text-black ml-1" fill="black" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Playlist Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 truncate group-hover:text-(--color-accent-green) transition-colors">
                      {playlist.title}
                    </h3>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-(--color-text-secondary)">
                      <span className="flex items-center gap-1">
                        <Music2 size={14} />
                        {playlist.musics?.length || 0} tracks
                      </span>
                      {playlist.createdAt && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {new Date(playlist.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ArtistPlaylists;
