import React, { createContext, useContext, useEffect, useState } from 'react'
import { getOtherService } from '../api/otherService';

export const OtherContext = createContext();

const OtherDetailProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        handleOtherDetail();
    }, [])

    const handleOtherDetail = async () => {
        try {

            const response = await getOtherService();
            setData(response.data);
            return response;

        }
        catch (error) {

            console.error("otp error:", error);
            setError(error);
        }
    }

    return (
        <OtherContext.Provider value={{ data, error }}>
            {children}
        </OtherContext.Provider>
    )
}
export const useOtherDetail = () => {
    return useContext(OtherContext)
}


export default OtherDetailProvider