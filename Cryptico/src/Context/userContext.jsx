import React, { createContext, useContext, useState } from 'react'
import { userDetails } from '../api/userService'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);



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
        <UserContext.Provider value={{ handleUserDetail, user, error }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider