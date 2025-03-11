import { axiosInstance } from "./axiosInstance"

export const addAccount = async (values) => {
    try {

        const response = await axiosInstance.post('/payment-details',
            {
                account_type: values.accountType,
                bank_account_country: values.bankCountry,
                currency: values.currency,
                bank_name: values.bankName,
                account_holder_name: values.accountHolder,
                custom_bank_details: values.customBankDetails,
                ifsc_code: values.ifsc,
                account_number: values.accountNumber,
                swift_bic_code: values.swiftCode,
                residence_country: values.country,
                state_region: values.state,
                city: values.city,
                zip_code: values.zipCode,
                address: values.address

            }


        )

        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getPaymentDetails = async () => {
    try {
        const response = await axiosInstance.get('/payment-details');
        console.log(response.data);
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }
}




