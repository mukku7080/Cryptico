import React, { createContext, useContext, useEffect } from 'react'
import { login, signup, logout, emailOtp, verifyEmailOtp, loginWithGoogle, SignupWithGoogle } from '../api/authService';
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
            // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
            const data = await emailOtp();
            return data;
        }
        catch (error) {
            console.error("otp error:", error);

        }

    }
    const handleVerifyEmailOtp = async ({ otp }) => {
        try {
            const data = await verifyEmailOtp({ otp });
            return data;
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

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout, handleEmailOtp, handleVerifyEmailOtp, handleLoginWithGoogle, handleSignupWithGoogle, error }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};
