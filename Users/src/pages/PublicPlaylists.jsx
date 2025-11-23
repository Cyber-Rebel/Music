import PlaylistCard from '../components/PlaylistCard';
import { playlists } from '../data/dummyData';

const PublicPlaylists = () => {
  const publicPlaylists = playlists.filter(p => p.isPublic);

  return (
    <div className="px-4 py-6 sm:p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Public Playlists</h1>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
        {publicPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default PublicPlaylists;
