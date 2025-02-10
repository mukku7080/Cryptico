
import { axiosInstance } from "./axiosInstance";

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post("/login", {
            username: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};
export const signup = async ({ email, password }) => {

    try {
        const response = await axiosInstance.post("/register", {
            email: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};

export const emailOtp = async () => {
    try {
        await axiosInstance.post('/send-email-otp');
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};
export const verifyEmailOtp = async ({ otp }) => {
    try {
        const response = await axiosInstance.post('/verify-email-otp', { otp });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};


export const logout = async () => {
    try {
        const response = await axiosInstance.delete("/logout");
        localStorage.removeItem("authToken");
        return response.data
    } catch (error) {
        console.error("Logout failed:", error);
    }
};