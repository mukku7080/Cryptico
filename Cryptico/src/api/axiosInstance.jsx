import axios from 'axios';
const api_url = 'http://192.168.29.109:7000/api';

export const axiosInstance = axios.create({

    baseURL: api_url,

});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        console.log(token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
