import { createContext, useContext, useEffect, useState } from "react";
import { AddOffer, ChangeActiveStatus, GetMyOffer, GetOffers } from "../api/offerServices"
import { useUser } from "./userContext";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [sellOffer, setSellOffer] = useState([]);
    const [buyOffer, setBuyOffer] = useState([]);
    const [mySellOffer, setMySellOffer] = useState();
    const [myBuyOffer, setMyBuyOffer] = useState();
    const [myOfferAnalytics, setMyOfferAnalytics] = useState();
    const { user } = useUser()
    useEffect(() => {
        handleGetOffer();
    }, [user]);



    const [status, setSatus] = useState(false);

    const handleAddOffer = async (values) => {
        try {
            console.log(values);
            const response = await AddOffer(values);
            console.log(response);
            setSatus(response.status);
            return response;
        }
        catch (error) {

        }
    }
    const handleGetOffer = async () => {
        try {

            const response = await GetOffers();

            const selldata = response?.data?.filter(offer => offer.transaction_type === 'sell' && offer.user_id !== user?.user_id);
            const buydata = response?.data?.filter(offer => offer.transaction_type === 'buy' && offer.user_id !== user?.user_id);

            setSellOffer(selldata);
            setBuyOffer(buydata);
            setOffers(response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const handleGetMyOffer = async (queryParams) => {
        const response = await GetMyOffer(queryParams);
        const mySell = response?.data?.filter(offer => offer.transaction_type === 'sell');
        const myBuy = response?.data?.filter(offer => offer.transaction_type === 'buy');
        setMySellOffer(mySell);
        setMyBuyOffer(myBuy);
        setMyOfferAnalytics(response?.analytics);
        return response;

    }
    const handlechangeActiveStatus = async (request) => {
        const response = await ChangeActiveStatus(request);
        return response;
    }

    return (
        <OfferContext.Provider value={{ handleAddOffer, handleGetOffer, handleGetMyOffer, offers, sellOffer, buyOffer, mySellOffer, myBuyOffer, myOfferAnalytics, handlechangeActiveStatus }}>
            {children}
        </OfferContext.Provider>
    )
}
export const useOffer = () => useContext(OfferContext);
export default OfferProvider;



