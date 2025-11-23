import { useParams } from 'react-router-dom';
import { FaPlay, FaHeart, FaShare } from 'react-icons/fa';
import SongCard from '../components/SongCard';
import { songs } from '../data/dummyData';

const SongDetails = () => {
  const { id } = useParams();
  const song = songs.find(s => s.id === parseInt(id)) || songs[0];
  
  // Get related songs (filter by same artist or random songs)
  const relatedSongs = songs.filter(s => s.id !== song.id).slice(0, 6);

  return (
    <div className="bg-linear-to-b from-[#1a5c3c] via-[#121212] to-[#121212]">
      {/* Banner Section */}
      <div
        className="relative h-96 flex items-end p-8 pb-6"
        style={{
          background: `linear-gradient(180deg, rgba(29, 185, 84, 0.6) 0%, rgba(18, 18, 18, 0.8) 100%),
                      url(${song.cover}) center/cover`
        }}
      >
        <div className="flex items-end gap-6">
          <img
            src={song.cover}
            alt={song.title}
            className="w-56 h-56 rounded-lg shadow-2xl"
          />
          <div>
            <p className="text-sm font-semibold text-white mb-2">SONG</p>
            <h1 className="text-6xl font-bold text-white mb-4">{song.title}</h1>
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">{song.artist}</span>
              <span>•</span>
              <span>{song.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-8 py-8 flex items-center gap-4 bg-linear-to-b from-black/40 to-transparent">
        <button className="bg-[#1db954] text-black px-10 py-4 rounded-full font-bold hover:scale-105 hover:bg-[#1ed760] transition-all flex items-center justify-center gap-2 text-base shadow-xl">
          <FaPlay className="text-base" />
          <span>Play</span>
        </button>
        <button className="border-2 border-[#7f7f7f] text-white px-8 py-3.5 rounded-full font-semibold hover:border-white hover:scale-105 transition-all flex items-center justify-center gap-2 text-base bg-transparent/10">
          <FaHeart className="text-base" />
          <span>Like</span>
        </button>
        <button className="border-2 border-[#7f7f7f] text-white px-8 py-3.5 rounded-full font-semibold hover:border-white hover:scale-105 transition-all flex items-center justify-center gap-2 text-base bg-transparent/10">
          <FaShare className="text-base" />
          <span>Share</span>
        </button>
      </div>

      {/* Related Songs Section */}
      <div className="px-8 py-8 pt-12">
        <h2 className="text-2xl font-bold text-white mb-8">Related Songs</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
          {relatedSongs.map((relatedSong) => (
            <SongCard key={relatedSong.id} song={relatedSong} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
