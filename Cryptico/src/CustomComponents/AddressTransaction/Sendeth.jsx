import React, { useMemo } from 'react';
import { ethers } from 'ethers';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { gradientButtonStyle } from '../Wallet/CreateWallet';

const Sendeth = () => {
    const toast = useToast();

    // 1. Use Ethereum Sepolia testnet RPC
    const provider = useMemo(() => new ethers.providers.JsonRpcProvider(
        'https://sepolia.blockpi.network/v1/rpc/public'
    ), []);

    // 2. Use a testnet private key
    const wallet = useMemo(() => {
        const privateKey = '0x5ee0a3396a16000e90d6740d650463f2445dccf558dc2c57be79f5d8e4ffdbda'; // Never expose this in production
        return new ethers.Wallet(privateKey, provider);
    }, [provider]);

    const toAddress = '0xRecipientAddressHere';
    const amountInETH = 0.001;

    // 3. Send ETH
    async function transferETH() {
        try {
            const tx = await wallet.sendTransaction({
                to: toAddress,
                value: ethers.utils.parseEther(amountInETH.toString())
            });
            await tx.wait();
            toast({
                title: 'Transaction Sent',
                description: `TX Hash: ${tx.hash}`,
                status: 'success',
                duration: 8000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Transaction Failed',
                description: error.message,
                status: 'error',
                duration: 8000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex mt={50}>
            <Button sx={gradientButtonStyle} onClick={transferETH}>
                Send ETH
            </Button>
        </Flex>
    );
};

export default Sendeth;
