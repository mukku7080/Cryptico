import React, { createContext, useEffect, useState } from 'react'
import { addAccount, createWebWallet, getPaymentDetails, getTransactionDetail, getWalletKeyPhrase, getWeb3Wallet, updateWeb3WalletAddress, updateIsPrimaryAccount, AddUpiDetails, sendInternalTransfer, WalletAddressTransaction } from '../api/accountService';

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [accountDetails, setAccountDetails] = React.useState(null);
    const [walletkeyphrase, setWalletKeyPhrase] = useState(null);
    const [web3wallet, setWeb3Wallet] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [upidetails, setUpiDetails] = useState();
    const [upibankDetails, setUpiBankDetails] = useState(null);



    useEffect(() => {
        handleGetAccountDetail('');
        handleGetWeb3Wallet();
        handleGetAllTransaction();

    }, []);

    const handleAddAccount = async (values) => {
        try {
            const res = await addAccount(values);
            return res;
        }
        catch (error) {
            throw error;
        }

    }

    const handleAddUpiDetails = async (values) => {
        const response = await AddUpiDetails(values);
        return response;
    }
    const handleGetAccountDetail = async (paymentType) => {
        try {
            const res = await getPaymentDetails(paymentType);
            setAccountDetails(res?.payment_details);
            setUpiDetails(res?.upi_details);
            setUpiBankDetails(res);
        }
        catch (error) {
            throw error;
        }
    }
    const updateIsPrimary = async (value) => {
        try {
            const res = await updateIsPrimaryAccount(value);
            return res;

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
            throw error;

        }
    }
    const handleGetWeb3Wallet = async () => {
        try {
            const res = await getWeb3Wallet();
            setWeb3Wallet(res);
            return res;
        }
        catch (error) {
            throw error;
        }

    }
    const handleGetAllTransaction = async () => {
        try {
            const res = await getTransactionDetail();
            setTransaction(res);

            return res;
        }
        catch (error) {
            throw error;
        }
    }
    const handleSendInternalTransaction = async (userDetail) => {
        const response = await sendInternalTransfer(userDetail);
        return response;

    }
    const handleWalletAddressTransaction = async (userDetail) => {
        const response = await WalletAddressTransaction(userDetail);
        return response;

    }


    return (
        <AccountContext.Provider value={{
            handleAddAccount,
            accountDetails,
            getKeyPhrase,
            walletkeyphrase,
            setWalletKeyPhrase,
            handleCreateWallet,
            handleUpdateweb3WalletAddress,
            web3wallet,
            handleGetWeb3Wallet,
            handleGetAllTransaction,
            transaction,
            updateIsPrimary,
            handleGetAccountDetail,
            handleAddUpiDetails,
            upidetails,
            upibankDetails,
            handleSendInternalTransaction,
            handleWalletAddressTransaction
        }}>
            {children}
        </AccountContext.Provider>
    )


}
export const useAccount = () => {
    return React.useContext(AccountContext);

}

export default AccountProvider