import { axiosInstance } from "./axiosInstance";


export const InititateTrade = async (data) => {
    try {
        const response = await axiosInstance.post("/trade/initiate-trade", data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error;
    }
}
export const BuyerUpdate = async (data) => {
    try {
        const response = await axiosInstance.post("/trade/buyer-update-trade", data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error;
    }
}