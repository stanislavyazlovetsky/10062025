import axios from 'axios';
import { BASE_URL } from '../../constants/api';

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(
  config => {
    const token = "your_secret_token";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosClient;
