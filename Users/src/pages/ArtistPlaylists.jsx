import PlaylistCard from '../components/PlaylistCard';
import { playlists } from '../data/dummyData';

const ArtistPlaylists = () => {
  // Filter playlists created by artists (not users)
  const artistPlaylists = playlists.filter(p => p.creator !== 'You');

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Artist Playlists</h1>
      <p className="text-[#b3b3b3] mb-6">Curated playlists by your favorite artists</p>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
        {artistPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistPlaylists;
