import axios from 'axios';

let axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axiosConfig;