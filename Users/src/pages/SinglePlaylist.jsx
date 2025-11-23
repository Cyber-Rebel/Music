import { useParams } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import SongTableRow from '../components/SongTableRow';
import { playlists, userPlaylists, songs } from '../data/dummyData';

const SinglePlaylist = () => {
  const { id } = useParams();
  
  // Find playlist from both playlists and userPlaylists
  const allPlaylists = [...playlists, ...userPlaylists];
  const playlist = allPlaylists.find(p => p.id === parseInt(id)) || allPlaylists[0];
  
  // Get songs for this playlist (using dummy data - just show some songs)
  const playlistSongs = songs.slice(0, 8);

  return (
    <div>
      {/* Playlist Banner */}
      <div
        className="relative h-80 flex items-end p-8"
        style={{
          background: `linear-gradient(180deg, rgba(29, 185, 84, 0.4) 0%, #121212 100%),
                      url(${playlist.cover}) center/cover`
        }}
      >
        <div className="flex items-end gap-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-52 h-52 rounded-lg shadow-2xl"
          />
          <div>
            <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
            <h1 className="text-5xl font-bold text-white mb-4">{playlist.name}</h1>
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">{playlist.creator}</span>
              <span>•</span>
              <span>{playlist.songCount} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="px-8 py-6">
        <button className="bg-[#1db954] text-black p-4 rounded-full hover:scale-105 transition-transform shadow-lg">
          <FaPlay className="text-2xl ml-1" />
        </button>
      </div>

      {/* Songs Table */}
      <div className="px-8">
        <table className="w-full">
          <thead className="border-b border-[#282828]">
            <tr className="text-left text-[#b3b3b3] text-sm">
              <th className="pb-3 px-4 font-normal">#</th>
              <th className="pb-3 px-4 font-normal">TITLE</th>
              <th className="pb-3 px-4 font-normal">ARTIST</th>
              <th className="pb-3 px-4 font-normal text-right">DURATION</th>
            </tr>
          </thead>
          <tbody>
            {playlistSongs.map((song, index) => (
              <SongTableRow key={song.id} song={song} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SinglePlaylist;
