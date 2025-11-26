import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import SongDetails from './pages/SongDetails';
import LikedSongs from './pages/LikedSongs';
import ArtistPlaylists from './pages/ArtistPlaylists';
import SinglePlaylist from './pages/SinglePlaylist';
import CreatePlaylist from './pages/CreatePlaylist';
import MyPlaylists from './pages/MyPlaylists';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          {/* Auth Routes - Without MainLayout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* App Routes - With MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="song/:id" element={<SongDetails />} />
            <Route path="liked-songs" element={<LikedSongs />} />
            <Route path="artist-playlists" element={<ArtistPlaylists />} />
            <Route path="playlist/:id" element={<SinglePlaylist />} />
            <Route path="create-playlist" element={<CreatePlaylist />} />
            <Route path="my-playlists" element={<MyPlaylists />} />
          </Route>
        </Routes>
      </Router>
    </MusicProvider>
  );
};

export default App;