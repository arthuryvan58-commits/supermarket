import axios from 'axios';

const api = axios.create({
    baseURL: "https://51.68.124.152/erp/api/", // L'URL de votre backend Django
});

export default api;
