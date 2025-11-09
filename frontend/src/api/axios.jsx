import axios from 'axios';

export const authapi = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const musicapi = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});








// export const API_URL = 'http://localhost:3000';

