import React, { createContext, useContext, useEffect } from 'react'
import { login, signup, logout, emailOtp, verifyEmailOtp, loginWithGoogle, SignupWithGoogle, forgetPassword, resetPassword } from '../api/authService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate('');

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setUser({ token });

        }
    }, [])



    const handleLogin = async ({ email, password }) => {
        try {

            const data = await login({ email, password });
            localStorage.setItem("authToken", data.token);
            setUser(data.user);
        }
        catch (error) {
            console.error("Login error:", error);
            alert(error.message || "Login failed");

        }

    };
    const handleLoginWithGoogle = async () => {
        try {

            const data = loginWithGoogle();
            console.log(data);
            localStorage.setItem("authToken", data.token);
            setUser(data.user);
        }
        catch (error) {
            console.error("Login error:", error);
            alert(error.message || "Login failed");

        }

    };
    const handleSignupWithGoogle = async () => {
        try {

            const data = SignupWithGoogle();
            localStorage.setItem("authToken", data.token);
            setUser(data.user);
        }
        catch (error) {
            console.error("Login error:", error);
            alert(error.message || "Login failed");
        }
    };
    const handleSignup = async ({ email, password }) => {
        try {

            const data = await signup({ email, password });
            localStorage.setItem("authToken", data.token);
            setUser(data.user);
            return data;
        }
        catch (error) {
            setError(error);
            console.error("Signup error:", error);
            return error;
        }
    };
    const handleEmailOtp = async () => {
        try {
            const response = await emailOtp();
            return response;
        }
        catch (error) {
            console.error("otp error:", error);
        }

    }
    const handleVerifyEmailOtp = async ({ otp }) => {
        try {
            const response = await verifyEmailOtp({ otp });
            console.log(response);
            return response;
        }
        catch (error) {
            console.error("otp error:", error);

        }

    }


    const handleLogout = async () => {
        try {

            const data = await logout();
            setUser(null);
            return data;
        }
        catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            const data = await forgetPassword(email);
            return data;
        }
        catch (error) {
            console.error("Forgot password error:", error);
            return error;
        }
    }
    const handleResetPassword = async ({ email, resetToken, newPassword }) => {
        try {

            const data = await resetPassword({ email, resetToken, newPassword });
            return data;
        }
        catch (error) {
            console.error("Reset password error:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout, handleEmailOtp, handleVerifyEmailOtp, handleLoginWithGoogle, handleSignupWithGoogle, handleForgotPassword, handleResetPassword, error }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};
