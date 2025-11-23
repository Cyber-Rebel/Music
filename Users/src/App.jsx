import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import SongDetails from './pages/SongDetails';
import PublicPlaylists from './pages/PublicPlaylists';
import ArtistPlaylists from './pages/ArtistPlaylists';
import SinglePlaylist from './pages/SinglePlaylist';
import CreatePlaylist from './pages/CreatePlaylist';
import MyPlaylists from './pages/MyPlaylists';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="song/:id" element={<SongDetails />} />
          <Route path="playlists" element={<PublicPlaylists />} />
          <Route path="artist-playlists" element={<ArtistPlaylists />} />
          <Route path="playlist/:id" element={<SinglePlaylist />} />
          <Route path="create-playlist" element={<CreatePlaylist />} />
          <Route path="my-playlists" element={<MyPlaylists />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;