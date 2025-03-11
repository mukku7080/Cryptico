import React, { createContext, useEffect } from 'react'
import { addAccount, getPaymentDetails } from '../api/accountService';

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [accountDetails, setAccountDetails] = React.useState(null);

    useEffect(() => {
        getAccountDetail();
    }, []);

    const handleAddAccount = async (values) => {
        try {
            const res = await addAccount(values);
            return res;
        }
        catch (error) {
            // console.log(error);
            // console.error("API error in handleAddAccount:", error.response?.data || error.message);

            // throw error.response?.data || { message: "An unexpected error occurred" };
            throw error;
        }

    }

    const getAccountDetail = async () => {
        try {
            const res = await getPaymentDetails();
            setAccountDetails(res?.payment_details);
        }
        catch (error) {
            throw error;
        }
    }



    return (
        <AccountContext.Provider value={{ handleAddAccount, accountDetails }}>
            {children}
        </AccountContext.Provider>
    )


}
export const useAccount = () => {
    return React.useContext(AccountContext);

}

export default AccountProvider