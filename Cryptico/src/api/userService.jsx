import { axiosInstance } from "./axiosInstance"

export const userDetails = async () => {
    try {

        const res = await axiosInstance.get('/user-details')
        return res.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
}


