
import axios from 'axios';
import { setLoading, setUser, setError, logout as logoutAction } from '../slices/userSlice.jsx';

const API_BASE_URL = 'http://localhost:3000/api/auth';

// Fetch artist profile
export const fetchArtistProfile = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const res = await axios.get(`${API_BASE_URL}/artist/me`, { withCredentials: true });
		dispatch(setUser(res.data.user));
	} catch (error) {
		dispatch(setError(error.response?.data?.message || 'Error fetching profile'));
	}
};

// Logout
export const logout = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
		dispatch(logoutAction());
		window.location.href = '/login';
	} catch (error) {
		dispatch(setError(error.response?.data?.message || 'Error logging out'));
	}
};


export const loginArtist = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const res = await axios.post(`${API_BASE_URL}/login`, credentials, { withCredentials: true });
		dispatch(setUser(res.data.user));
	} catch (error) {
		dispatch(setError(error.response?.data?.message || 'Error logging in'));
	}
};		

export const signupArtist = (artistData) => async (dispatch) => {	
	dispatch(setLoading(true));
	try {
		const res = await axios.post(`${API_BASE_URL}/register`, artistData, { withCredentials: true });
		dispatch(setUser(res.data.user));
	} catch (error) {
		dispatch(setError(error.response?.data?.message || 'Error signing up'));
	}
}