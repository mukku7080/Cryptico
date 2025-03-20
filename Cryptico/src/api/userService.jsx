import axios from "axios";
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
export const changeProfilePic = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axiosInstance.post('/update-profile-image',
            formData,
        )
        return res.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;


    }
}
export const changePassword = async (values) => {
    try {
        const response = await axiosInstance.post("/change-password", {
            current_password: values.currentPassword,
            new_password: values.password,

        })
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
        
    }
}


