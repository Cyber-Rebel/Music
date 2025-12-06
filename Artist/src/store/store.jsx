import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.jsx'
import musicReducer from './slices/musicslice.jsx'

export const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
  },
})