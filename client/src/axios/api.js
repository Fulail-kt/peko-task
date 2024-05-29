import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

Api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('peko');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export default Api;