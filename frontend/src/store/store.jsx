import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.jsx';
import musicReducer from './slices/musicSlice.jsx';

const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
  },
});

export default store;