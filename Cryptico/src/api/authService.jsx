import { axiosInstance } from "./axiosInstance";

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            username: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};

export const loginWithGoogle = async () => {
    try {
        window.location.href = 'https://api.onnbit.com/api/auth/redirect';
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};

export const SignupWithGoogle = async () => {
    try {
        window.location.href = 'https://api.onnbit.com/api/auth/redirect';
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};
export const signup = async ({ email, password }) => {

    try {
        const response = await axiosInstance.post("/auth/register", {
            email: email,
            password: password,
            referralCode: localStorage.getItem("referralCode") || ""
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};

export const emailOtp = async () => {
    try {
        const response = await axiosInstance.post('/send-email-otp');

        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};
export const verifyEmailOtp = async ({ otp }) => {
    try {
        const response = await axiosInstance.post('/verify-email-otp', { otp });
        console.log(response);
        return response;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};


export const logout = async () => {
    try {
        const response = await axiosInstance.delete("/auth/logout");
        localStorage.removeItem("authToken");
        return response.data
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
export const forgetPassword = async (email) => {
    try {
        const response = await axiosInstance.post("/auth/forgot-password", {
            email
        })
        return response.data

    }
    catch (error) {
        throw error.response ? error.response.data : error;



    }
}
export const resetPassword = async ({ email, resetToken, newPassword }) => {
    try {
        console.log(email);
        console.log(resetToken);
        console.log(newPassword);
        const response = await axiosInstance.post("auth/reset-password", {
            email: email,
            token: resetToken,
            password: newPassword


        })
        return response.data

    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
}
export const passwordMatch = async (password) => {
    try {
        const response = await axiosInstance.post("/auth/password-verification", {
            password: password
        })
        return response.data
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
