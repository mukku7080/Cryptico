import { useState } from 'react';
import { ethers } from 'ethers';

function SendEthNew() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    // 🔐 Your sender's private key (Never expose in frontend in real-world apps!)
    const privateKey = '0x31f21f287b5acb57c3fc8a7711b3412c9d701871528b39f96f9c55da50dd2ee7';

    const sendEth = async () => {
        try {
            // Connect to the Ethereum network (mainnet/testnet/localhost)
            const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/e132d995b709421c93480a095f17bf59`);


            // Create a wallet from the private key
            const wallet = new ethers.Wallet(privateKey, provider);

            // Send transaction
            const tx = await wallet.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount),
            });

            setStatus(`Transaction sent: ${tx.hash}`);
            await tx.wait();
            setStatus('Transaction confirmed!');
        } catch (err) {
            setStatus(`Transaction failed: ${err.message}`);
        }
    };

    return (
        <div>
            <h2 style={{ margin: '100px' }}>Send ETH (From Private Key)</h2>
            <input
                type="text"
                placeholder="Recipient address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendEth}>Send ETH</button>
            <p>{status}</p>
        </div>
    );
}

export default SendEthNew;
