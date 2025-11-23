import SongCard from '../components/SongCard';
import { songs } from '../data/dummyData';

const Home = () => {
  return (
    <div className="px-4 py-6 sm:p-6">
      <h1 className="text-4xl font-bold text-white mb-8">All Songs</h1>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Home;
