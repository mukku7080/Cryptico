import { useState } from 'react';
import { ethers } from 'ethers';

function SendEth() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [sender, setSender] = useState('');

    const connectWallet = async () => {
        if (!window.ethereum) return alert('MetaMask is not installed.');

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setSender(accounts[0]); // Save sender address
            setStatus(`Connected: ${accounts[0]}`);
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    };

    const sendEth = async () => {
        if (!window.ethereum) return alert('MetaMask is not installed.');

        try {
            // Always request accounts before using signer
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (!accounts || accounts.length === 0) {
                setStatus('No accounts found.');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // ensures permission
            const signer = provider.getSigner();

            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount),
            });

            setStatus('Transaction sent. Waiting for confirmation...');
            await tx.wait();
            setStatus('Transaction successful!');
        } catch (err) {
            setStatus(`Transaction failed: ${err.message}`);
        }
    };


    return (
        <div>
            <h2>Send ETH</h2>
            <button onClick={connectWallet}>Connect Wallet</button>
            <p><strong>Sender:</strong> {sender}</p>

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

export default SendEth;
