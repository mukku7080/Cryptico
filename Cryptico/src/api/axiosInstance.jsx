import axios from 'axios';
const api_url = 'https://api.onnbit.com/api';

export const axiosInstance = axios.create({

    baseURL: api_url,

});

axiosInstance.interceptors.request.use(
    (config) => {
        // const sessionToken = sessionStorage.getItem("authToken");
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
