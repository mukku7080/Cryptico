import { ethers } from 'ethers';
const SendBnd = async (privateKey, walletAddress, assetValue) => {

    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const wallet = new ethers.Wallet(privateKey, provider);
    const amountInBNB = assetValue;
    try {
        const tx = await wallet.sendTransaction({
            to: walletAddress,
            value: ethers.utils.parseEther(amountInBNB.toString())
        });
        await tx.wait();

    } catch (error) {
        console.error(error);
    }
};


export default SendBnd;
