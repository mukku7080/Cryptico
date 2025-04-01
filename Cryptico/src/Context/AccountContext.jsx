import React, { createContext, useEffect, useState } from 'react'
import { addAccount, createWebWallet, getPaymentDetails, getWalletKeyPhrase, updateWeb3WalletAddress } from '../api/accountService';

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [accountDetails, setAccountDetails] = React.useState(null);
    const [walletkeyphrase, setWalletKeyPhrase] = useState(null);

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


    const getKeyPhrase = async () => {
        try {
            const res = await getWalletKeyPhrase();
            setWalletKeyPhrase(res.data);
            return res;



        }
        catch (error) {
            throw error;
        }
    }
    const handleCreateWallet = async (blockChainType) => {
        try {
            const res = await createWebWallet(blockChainType);
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleUpdateweb3WalletAddress = async (values) => {
        try {
            const res = await updateWeb3WalletAddress(values);
            return res;
        }
        catch (error) {
            console.log(error);

        }
    }


    return (
        <AccountContext.Provider value={{ handleAddAccount, accountDetails, getKeyPhrase, walletkeyphrase, setWalletKeyPhrase, handleCreateWallet, handleUpdateweb3WalletAddress }}>
            {children}
        </AccountContext.Provider>
    )


}
export const useAccount = () => {
    return React.useContext(AccountContext);

}

export default AccountProvider