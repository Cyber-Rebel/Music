import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artistTracks: [],
  playlists: [],
  loading: false,
  error: null,
  createPlaylistLoading: false,
  createPlaylistError: null,
  createPlaylistSuccess: false,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    // Fetch artist tracks
    fetchArtistTracksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchArtistTracksSuccess: (state, action) => {
      state.loading = false;
      state.artistTracks = action.payload;
    },
    fetchArtistTracksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create playlist
    createPlaylistStart: (state) => {
      state.createPlaylistLoading = true;
      state.createPlaylistError = null;
      state.createPlaylistSuccess = false;
    },
    createPlaylistSuccess: (state, action) => {
      state.createPlaylistLoading = false;
      state.createPlaylistSuccess = true;
      state.playlists.push(action.payload);
    },
    createPlaylistFailure: (state, action) => {
      state.createPlaylistLoading = false;
      state.createPlaylistError = action.payload;
    },
    resetCreatePlaylistState: (state) => {
      state.createPlaylistLoading = false;
      state.createPlaylistError = null;
      state.createPlaylistSuccess = false;
    },
  },
});

export const {
  fetchArtistTracksStart,
  fetchArtistTracksSuccess,
  fetchArtistTracksFailure,
  createPlaylistStart,
  createPlaylistSuccess,
  createPlaylistFailure,
  resetCreatePlaylistState,
} = musicSlice.actions;

export default musicSlice.reducer;
