import { defaults } from 'autoprefixer';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fitoflv-backend.onrender.com/api',
});

export default api;