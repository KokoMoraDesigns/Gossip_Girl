import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

const api = axios.create({
    baseURL: API_URL,
    withCredentials:true,
});

export default api;