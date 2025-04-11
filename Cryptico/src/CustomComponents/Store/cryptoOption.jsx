import { SiConvertio } from 'react-icons/si';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { useWalletStore } from './useWalletStore';
import { Receive1, Receive2, Receive3, Receive4, Send1, Send2, Send3, Send4, ThreeDotMenu1 } from '../Wallet/Balance';

export const useCryptoOption = () => {
    const wallet = useWalletStore((state) => state.web3wallet);
    const ether = wallet?.data?.ethereum || []



    return [
        {
            status: wallet?.data?.bitcoin ? true : false,
            shrotName: 'BTC',
            name: 'Bitcoin',
            logo: '/imagelogo/bitcoin-btc-logo.png',
            pricePerCoin: '1 BTC = 8,448,496.2999 INR',
            blc: wallet?.data?.bitcoin?.[0]?.remaining_amount, INR: '0.00',
            table: 'true',
            receive: <Receive1 />,
            send: <Send1 />,
            threedots: <ThreeDotMenu1 btnName={'BTC'} />,

            actions: [
                { action: <Send1 /> },
                { action: <Receive1 /> },
                { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
                { name: 'Buy BTC', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell BTC', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: ether.find(item => item.asset === 'eth') ? true : false,
            shrotName: 'ETH',
            name: 'Ethereum',
            logo: '/imagelogo/ethereum-eth-logo.png',
            pricePerCoin: '1 ETH = 8,448,496.2999 INR',
            blc: ether.find(item => item.asset === 'eth')?.remaining_amount, INR: '0.00',
            table: 'true',
            receive: <Receive2 />,
            send: <Send2 />,
            threedots: <ThreeDotMenu1 btnName={'ETH'} />,

            actions: [
                { action: <Send2 /> },
                { action: <Receive2 /> },
                { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
                { name: 'Buy ETH', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell ETH', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: wallet?.data?.binance ? true : false,
            shrotName: 'BNB', name: 'Binance',
            logo: '/imagelogo/bnb-bnb-logo.png',
            pricePerCoin: '1 BNB = 8,448,496.2999 INR',
            blc: wallet?.data?.binance?.[0]?.remaining_amount, INR: '0.00',
            receive: <Receive3 />, send: <Send3 />,
            threedots: <ThreeDotMenu1 btnName={'USDC'} />,

            actions: [
                { action: <Send3 /> },
                { action: <Receive3 /> },
                { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
                { name: 'Buy USDC', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell USDC', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: ether.find(item => item.asset === 'usdt') ? true : false,
            shrotName: 'USDT', name: 'Tether',
            logo: '/imagelogo/tether-usdt-logo.png',
            pricePerCoin: '1 USDT = 8,448,496.2999 INR',
            blc: ether.find(item => item.asset === 'usdt')?.remaining_amount, INR: '0.00',
            receive: <Receive4 />, send: <Send4 />,
            threedots: <ThreeDotMenu1 btnName={'USDT'} />,
            actions: [
                { action: <Send4 /> },
                { action: <Receive4 /> },
                { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
                { name: 'Buy USDT', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell USDT', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        }
    ];
};
