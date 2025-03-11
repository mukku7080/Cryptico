import { axiosInstance } from "./axiosInstance";

export const getOtherService = async () => {
    try {
        const response = await axiosInstance.get("/countries-currency");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const getCountrycode = async () => {
    try {
        const response = await axiosInstance.get("/countries-dialing-code");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}