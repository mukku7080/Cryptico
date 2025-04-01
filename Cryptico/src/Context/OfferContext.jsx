import { createContext, useContext, useState } from "react";
import { AddOffer, GetOffers } from "../api/offerServices"

const OfferContext = createContext();

const OfferProvider = ({ children }) => {

    const [status, setSatus] = useState(false);

    const handleAddOffer = async (values) => {
        try {
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
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <OfferContext.Provider value={{ handleAddOffer, handleGetOffer }}>
            {children}
        </OfferContext.Provider>
    )
}
export const useOffer = () => useContext(OfferContext);
export default OfferProvider;



