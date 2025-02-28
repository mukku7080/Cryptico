import { axiosInstance } from "./axiosInstance";

export const getOtherService = async () => {
    try {
        const response = await axiosInstance.get("https://api.onnbit.com/api/countries-currency");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}