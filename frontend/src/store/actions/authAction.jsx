import {authapi} from '../../api/axios.jsx'
import {setUser,clearUser} from '../slices/authSlice.jsx'

export const loginUser = (formData) => async (dispatch) => {
    try {
        const response = await authapi.post('/auth/login', formData);
        console.log("Login Response:", response);
        dispatch(setUser(response.data.user));
        return response.data.user;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

export const logoutUser = () => async (dispatch) => {
 
};          
export const registerUser = (formData) => async (dispatch) => {
    try {
        const response = await authapi.post('/auth/register', formData);
        dispatch(setUser(response.data.user));
        
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error);
        throw error;
    }
};
