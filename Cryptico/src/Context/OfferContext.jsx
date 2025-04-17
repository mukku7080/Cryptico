import { createContext, useContext, useEffect, useState } from "react";
import { AddOffer, GetOffers } from "../api/offerServices"
import { useUser } from "./userContext";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [sellOffer, setSellOffer] = useState([]);
    const [buyOffer, setBuyOffer] = useState([]);
    const [mySellOffer, setMySellOffer] = useState();
    const [myBuyOffer, setMyBuyOffer] = useState();
    const { user } = useUser()
    const [userid, setUserId] = useState();
    useEffect(() => {
        setUserId(user?.user_id);
        handleGetOffer();

    }, [user]);


    // useEffect(() => {
    //     handleGetOffer();
    // }, [])
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
            const mydata = response.data.data.filter((item) => item.user_id === userid);
            console.log(mydata);
            const selldata = response.data.data.filter(offer => offer.transaction_type === 'sell' && offer.user_id !== userid);
            const buydata = response.data.data.filter(offer => offer.transaction_type === 'buy' && offer.user_id !== userid);
            const mySell = response.data.data.filter(offer => offer.transaction_type === 'sell' && offer.user_id === userid);
            const myBuy = response.data.data.filter(offer => offer.transaction_type === 'buy' && offer.user_id === userid);
            setMySellOffer(mySell);
            setMyBuyOffer(myBuy);
            setSellOffer(selldata);
            setBuyOffer(buydata);
            setOffers(response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OfferContext.Provider value={{ handleAddOffer, handleGetOffer, offers, sellOffer, buyOffer, mySellOffer, myBuyOffer }}>
            {children}
        </OfferContext.Provider>
    )
}
export const useOffer = () => useContext(OfferContext);
export default OfferProvider;



