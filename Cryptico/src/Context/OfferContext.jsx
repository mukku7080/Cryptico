import { createContext, useContext, useEffect, useState } from "react";
import { AddOffer, ChangeActiveStatus, GetMyOffer, GetOffers } from "../api/offerServices"
import { useUser } from "./userContext";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [sellOffer, setSellOffer] = useState([]);
    const [buyOffer, setBuyOffer] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    const [mySellOffer, setMySellOffer] = useState();
    const [myBuyOffer, setMyBuyOffer] = useState();
    const [myOfferAnalytics, setMyOfferAnalytics] = useState();

    const [queryParams, setQueryParams] = useState({
        user_id: '',
        txn_type: '',
        cryptocurrency: '',
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,

    });


    const { user } = useUser()
    // useEffect(() => {
    //     // handleGetOffer('');
    // }, [user]);




    const [status, setSatus] = useState(false);

    const handleAddOffer = async (values) => {
        try {
            console.log(values);
            const response = await AddOffer(values);
            setSatus(response.status);
            return response;
        }
        catch (error) {

        }
    }
    const handleGetOffer = async (queryParamsOther) => {


        const newQueryParams = {
            user_id: queryParamsOther.user_id || '',
            txn_type: queryParamsOther.txn_type || '',
            cryptocurrency: queryParamsOther.cryptocurrency || '',
            paymentMethod: queryParamsOther.paymentMethod || '',
            maxAmount: queryParamsOther.maxAmount || '',
            offerLocation: queryParamsOther.offerLocation || '',
            traderLocation: queryParamsOther.traderLocation || '',
            activeTrader: queryParamsOther.activeTrader || false,
            per_page: 10,
        };
        setQueryParams(newQueryParams);
        try {

            const response = await GetOffers(newQueryParams);
            if (queryParams?.user_id) {

                setOffers(response?.data?.offer);
                response?.data;
            }
            else {
                setOffers(response?.data);

            }
            setAnalytics(response?.analytics);


            return response;
        } catch (error) {
            console.log(error);
        }
        finally {

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
        <OfferContext.Provider value={{ handleAddOffer, handleGetOffer, handleGetMyOffer, offers, sellOffer, buyOffer, mySellOffer, myBuyOffer, myOfferAnalytics, handlechangeActiveStatus, analytics, queryParams, setQueryParams, setOffers, setAnalytics }}>
            {children}
        </OfferContext.Provider>
    )
}
export const useOffer = () => useContext(OfferContext);
export default OfferProvider;



