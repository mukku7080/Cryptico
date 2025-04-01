import React, { createContext, useContext, useEffect, useState } from 'react'
import { AddSecurityQuestions, getAllNotification, getCountrycode, getLoginHistory, getOtherService, getReferalLink } from '../api/otherService';

export const OtherContext = createContext();

const OtherDetailProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [loginhistory, setLoginHistory] = useState(null);
    const [referalLink, setReferalLink] = useState(null);
    const [notifications, setNotification] = useState(null);

    useEffect(() => {
        handleCountryCode();
        handleOtherDetail();
        handleLoginHistory();
        handleReferralLink();
        handleGetAllNotification();
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
    const handleSecurityQuestions = async (values) => {
        try {
            const response = await AddSecurityQuestions(values);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    const handleLoginHistory = async () => {
        try {
            const response = await getLoginHistory();
            setLoginHistory(response.data);
        }
        catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
    const handleReferralLink = async () => {
        try {

            const res = await getReferalLink();

            setReferalLink(res.referralLink);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    const handleGetAllNotification = async () => {
        try {
            const response = await getAllNotification();
            setNotification(response);
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <OtherContext.Provider value={{ data, error, countryCode, handleSecurityQuestions, loginhistory, handleReferralLink, referalLink, notifications }}>
            {children}
        </OtherContext.Provider>
    )
}
export const useOtherDetail = () => {
    return useContext(OtherContext)
}



export default OtherDetailProvider