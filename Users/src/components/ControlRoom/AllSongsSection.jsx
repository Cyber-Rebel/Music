import { useState, useEffect } from 'react';
import { FaMusic, FaPlay, FaList, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { MUSIC_API } from '../../config/api';

const AllSongsSection = ({ 
  allMusic, 
  currentSong, 
  isPlaying, 
  onPlaySong, 
  onAddToQueue 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchSongs = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`${MUSIC_API}/search/${encodeURIComponent(searchQuery)}`, {
          withCredentials: true
        });
        setSearchResults(data.musics || []);
      } catch (error) {
        console.error("Error searching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchQuery) searchSongs();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const songsToDisplay = searchQuery ? searchResults : allMusic;

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#282828]">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FaMusic className="text-[#1db954]" />
        {searchQuery ? 'Search Results' : `All Songs (${allMusic?.length || 0})`}
      </h2>
      
      {/* Search Input */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#282828] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] border border-transparent focus:border-transparent placeholder-gray-500"
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1db954]"></div>
            <span className="ml-3 text-[#b3b3b3]">Searching...</span>
          </div>
        ) : songsToDisplay === undefined || songsToDisplay === null ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1db954]"></div>
            <span className="ml-3 text-[#b3b3b3]">Loading songs...</span>
          </div>
        ) : songsToDisplay.length === 0 ? (
          <div className="text-center py-8">
            <FaMusic className="text-4xl text-[#535353] mx-auto mb-3" />
            <p className="text-[#b3b3b3]">{searchQuery ? 'No songs found' : 'No songs available'}</p>
            {!searchQuery && <p className="text-[#535353] text-sm mt-1">Check if the music service is running</p>}
          </div>
        ) : (
          songsToDisplay.map((song, index) => (
            <div 
              key={song._id}
              onClick={() => onPlaySong(song, index)}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer group ${
                currentSong?._id === song._id 
                  ? 'bg-[#1db954]/20 border border-[#1db954]/40' 
                  : 'bg-[#282828] hover:bg-[#303030]'
              }`}
            >
              <div className="w-6 flex items-center justify-center">
                {currentSong?._id === song._id && isPlaying ? (
                  <div className="flex items-end gap-0.5 h-4">
                    <div className="w-1 bg-[#1db954] animate-pulse" style={{height: '60%'}}></div>
                    <div className="w-1 bg-[#1db954] animate-pulse" style={{height: '100%', animationDelay: '0.2s'}}></div>
                    <div className="w-1 bg-[#1db954] animate-pulse" style={{height: '40%', animationDelay: '0.4s'}}></div>
                  </div>
                ) : (
                  <>
                    <span className="text-[#b3b3b3] group-hover:hidden">{index + 1}</span>
                    <FaPlay className="text-white hidden group-hover:block text-sm" />
                  </>
                )}
              </div>
              <img 
                src={song.coverUrl || song.coverImage || 'https://placehold.co/60x60/1db954/ffffff?text=♪'} 
                alt={song.title} 
                className="w-12 h-12 rounded-lg object-cover" 
              />
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${currentSong?._id === song._id ? 'text-[#1db954]' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-[#b3b3b3] text-sm truncate">{song.artist}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToQueue(song);
                }}
                className="p-2 text-[#b3b3b3] hover:text-white hover:bg-[#404040] rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Add to queue"
              >
                <FaList className="text-xs" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllSongsSection;
