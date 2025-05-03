import axios from 'axios';
const api_url = 'https://api.onnbit.com/api';

export const axiosInstance = axios.create({

    baseURL: api_url,

});

let isLoggingOut = false;
axiosInstance.interceptors.request.use(
    (config) => {
        const sessionToken = sessionStorage.getItem("authToken");
        const token = sessionToken ? sessionToken : localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// axiosInstance.interceptors.response.use(
//     response => response,
//     (error) => {
//         if (error.response?.status === 401 && !isLoggingOut) {
//             try {
//                 const fullUrl = new URL(error.config.url, error.config.baseURL);
//                 const path = fullUrl.pathname;

//                 if (path.includes('/userDetail')) {
//                     isLoggingOut = true;
//                     sessionStorage.removeItem("authToken");
//                     localStorage.removeItem("authToken");
//                     window.location.href = '/login';
//                 }
//             } catch (e) {
//                 // fallback: still reject
//             }
//         }

//         return Promise.reject(error);
//     }
// );
