import React, { createContext, useContext, useEffect, useState } from 'react'
import { changeProfilePic, userDetails } from '../api/userService'
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();


    useEffect(() => {
        handleUserDetail();
    }, [location.pathname])



    const handleUserDetail = async () => {
        try {

            const response = await userDetails();
            const { user } = response;
            setUser(user);
            return response;

        }
        catch (error) {

            console.error("otp error:", error);
            setError(error);
        }
    }

    const handleChangeProfilePic = async (file) => {
        try {
            const response = await changeProfilePic(file);
            return response;
        }
        catch (error) {
            console.error("Error uploading image:", error);

        }
    }

    return (
        <UserContext.Provider value={{ user, error,setUser, handleChangeProfilePic }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider