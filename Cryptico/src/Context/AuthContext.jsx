import React, { createContext, useContext, useEffect, useState } from 'react'
import { login, signup, logout, emailOtp, verifyEmailOtp, loginWithGoogle, SignupWithGoogle, forgetPassword, resetPassword, passwordMatch, enable2FA } from '../api/authService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [passwordmatch, setPasswordMatch] = useState(null);
    const [verifyOtpResponse, setVerifyOtpResponse] = useState(null);
    const navigate = useNavigate('');



    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setUser({ token });

        }
    }, [])



    const handleLogin = async ({ email, password }) => {
        try {

            const response = await login({ email, password });
            setUser(response.user);
            return response;
        }
        catch (error) {
            console.error("Login error:", error);
            // alert(error.message || "Login failed");

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

            const response = await signup({ email, password });
            setUser(response.user);
            return response;
        }
        catch (error) {
            setError(error);
            console.error("Signup error:", error);
            return error;
        }
    };
    const handleEmailOtp = async (operation) => {
        try {
            const response = await emailOtp(operation);
            return response;
        }
        catch (error) {
            console.error("otp error:", error);
        }

    }
    const handleVerifyEmailOtp = async (verifyOtp) => {

        const response = await verifyEmailOtp(verifyOtp);
        setVerifyOtpResponse(response);
        if (response.status === true) {
            const token = sessionStorage.getItem('authToken');

            if (verifyOtp?.operation === 'login' || verifyOtp?.operation === 'email_verification') {
                localStorage.setItem("authToken", token);
                sessionStorage.removeItem('authToken');
            }

            if (verifyOtp?.operation === 'email_verification') {
                sessionStorage.removeItem('emailVerified');
            }
        }

        return response;



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
    const handlePasswordMatch = async (password) => {
        try {
            const data = await passwordMatch(password);
            setPasswordMatch(data);
            return data;
        }
        catch (error) {
            throw error;
        }

    }
    const handleEnable2FA = async (checked) => {
        try {
            const data = await enable2FA(checked);
            return data;
        }
        catch (error) {
            console.error("Enable 2FA error:", error);
        }
    }

    return (
        <AuthContext.Provider value={
            {
                user,
                handleLogin,
                handleSignup,
                handleLogout,
                handleEmailOtp,
                handleVerifyEmailOtp,
                handleLoginWithGoogle,
                handleSignupWithGoogle,
                handleForgotPassword,
                handleResetPassword,
                error,
                handlePasswordMatch,
                passwordmatch,
                handleEnable2FA,
                verifyOtpResponse
            }
        }>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};
