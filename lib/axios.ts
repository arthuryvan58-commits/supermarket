import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "api/", // L'URL de votre backend Django
});

export default api;