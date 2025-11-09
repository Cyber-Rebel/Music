import{ Route, Routes} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import CreatePlaylist from '../pages/CreatePlaylist';
import UploadSongs from '../pages/UploadSongs';
import MoodDetector from '../pages/MoodDetector';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/create-playlist' element={<CreatePlaylist />} />
            <Route path='/uploadsongs' element={<UploadSongs />} />
            <Route path='/mooddetector' element={<MoodDetector />} />
        </Routes>
    );
};

export default AppRouter;