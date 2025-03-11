import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCountrycode, getOtherService } from '../api/otherService';

export const OtherContext = createContext();

const OtherDetailProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [countryCode, setCountryCode] = useState(null);

    useEffect(() => {
        handleCountryCode();
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

    const handleCountryCode = async () => {
        try {

            const response = await getCountrycode();
            setCountryCode(response.data);
            return response;

        }
        catch (error) {

            console.error("otp error:", error);
            setError(error);
        }
    }

    return (
        <OtherContext.Provider value={{ data, error,countryCode }}>
            {children}
        </OtherContext.Provider>
    )
}
export const useOtherDetail = () => {
    return useContext(OtherContext)
}


export default OtherDetailProvider