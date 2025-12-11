import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlaylistDetails } from '../store/actions/musicaction.jsx';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Music2, Clock, Edit, Trash2, MoreVertical } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const PlaylistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playlistDetails, loading, error } = useSelector((state) => state.music);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(id));
  }, [dispatch, id]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    if (!playlistDetails?.musics) return '0:00';
    const totalSeconds = playlistDetails.musics.reduce((acc, track) => acc + (track.duration || 0), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/artist/playlists')}
        className="mb-4"
      >
        <ArrowLeft size={20} />
        Back to Playlists
      </Button>

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

      {/* Playlist Header */}
      {!loading && !error && playlistDetails && (
        <>
          <Card className="p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
              {/* Cover Image */}
              <div className="w-full md:w-48 lg:w-64 h-48 md:h-48 lg:h-64 rounded-lg overflow-hidden bg-(--color-card-hover) flex-shrink-0 shadow-2xl mx-auto md:mx-0">
                {playlistDetails.coverUrl ? (
                  <img
                    src={playlistDetails.coverUrl}
                    alt={playlistDetails.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music2 size={80} className="text-(--color-text-secondary)" />
                  </div>
                )}
              </div>

              {/* Playlist Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-(--color-text-secondary) mb-2">PLAYLIST</p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    {playlistDetails.title}
                  </h1>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-(--color-text-secondary) flex-wrap">
                    <span className="flex items-center gap-1">
                      <Music2 size={16} />
                      {playlistDetails.musics?.length || 0} songs
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {getTotalDuration()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <Button variant="primary" className="flex items-center gap-2 flex-1 sm:flex-initial justify-center">
                    <Play size={20} fill="black" />
                    Play All
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-initial justify-center">
                    <Edit size={20} />
                    Edit
                  </Button>
                  <Button variant="ghost" className="relative">
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Tracks List */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Tracks</h2>
            
            {playlistDetails.musics && playlistDetails.musics.length > 0 ? (
              <div className="space-y-2">
                {/* Table Header - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm text-(--color-text-secondary) border-b border-(--color-border-subtle)">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-5">Title</div>
                  <div className="col-span-3">Artist</div>
                  <div className="col-span-2">Genre</div>
                  <div className="col-span-1 text-right">
                    <Clock size={16} className="ml-auto" />
                  </div>
                </div>

                {/* Track Rows */}
                {playlistDetails.musics.map((track, index) => (
                  <motion.div
                    key={track._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-3 rounded-lg hover:bg-(--color-card-hover) transition-colors group cursor-pointer"
                  >
                    {/* Mobile: Index + Play */}
                    <div className="col-span-2 md:col-span-1 flex items-center justify-center">
                      <span className="text-(--color-text-secondary) group-hover:hidden text-sm">
                        {index + 1}
                      </span>
                      <Play
                        size={16}
                        className="text-(--color-accent-green) hidden group-hover:block"
                        fill="currentColor"
                      />
                    </div>
                    {/* Mobile: Cover + Title (takes remaining space) */}
                    <div className="col-span-8 md:col-span-5 flex items-center gap-2 sm:gap-3 min-w-0">
                      {track.coverUrl ? (
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-10 h-10 rounded object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-(--color-card-hover) flex items-center justify-center flex-shrink-0">
                          <Music2 size={16} className="text-(--color-text-secondary)" />
                        </div>
                      )}
                      <div className="overflow-hidden min-w-0 flex-1">
                        <p className="text-white font-medium truncate group-hover:text-(--color-accent-green) transition-colors text-sm sm:text-base">
                          {track.title}
                        </p>
                        {/* Mobile: Show artist below title */}
                        <p className="text-xs text-(--color-text-secondary) truncate md:hidden">
                          {track.artist || 'Unknown Artist'}
                        </p>
                      </div>
                    </div>
                    {/* Desktop: Artist */}
                    <div className="hidden md:flex md:col-span-3 items-center text-(--color-text-secondary) truncate">
                      {track.artist || 'Unknown Artist'}
                    </div>
                    {/* Desktop: Genre */}
                    <div className="hidden md:flex md:col-span-2 items-center text-(--color-text-secondary) truncate">
                      {track.genre || 'Unknown'}
                    </div>
                    {/* Mobile + Desktop: Duration */}
                    <div className="col-span-2 md:col-span-1 flex items-center justify-end text-(--color-text-secondary) text-xs sm:text-sm">
                      {formatDuration(track.duration)}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music2 size={48} className="text-(--color-text-secondary) mx-auto mb-4" />
                <p className="text-(--color-text-secondary)">No tracks in this playlist yet.</p>
              </div>
            )}
          </Card>
        </>
      )}
    </motion.div>
  );
};

export default PlaylistDetails;
