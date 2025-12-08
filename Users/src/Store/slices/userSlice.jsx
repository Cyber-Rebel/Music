import { createSlice } from '@reduxjs/toolkit';

// Initial state matches backend response structure
const initialState = {
  id: null,
  email: "",
  fullName: {
    firstName: "",
    lastName: ""
  },
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    
    // Payload structure: { id, email, fullName: { firstName, lastName }, role }
    setUser: (state, action) => {
      state.id = action.payload._id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    logout: (state) => {
      state.id = null;
      state.email = "";
      state.fullName = {
        firstName: "",
        lastName: ""
      };
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
