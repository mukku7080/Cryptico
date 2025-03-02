import React, { createContext, useContext, useEffect, useState } from 'react'
import { userDetails } from '../api/userService'
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const location=useLocation();


    useEffect(()=>{
        handleUserDetail();
    },[location.pathname])



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

    return (
        <UserContext.Provider value={{  user, error }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider