import { axiosInstance } from "./axiosInstance"

export const AddOffer = async (values) => {
    try {
        const response = await axiosInstance.post('/crypto-ad',

            {
                cryptocurrency: values.cryptoType,
                transaction_type: values.action,
                payment_method: values.paymentMethod,
                preferred_currency: values.preferCurrency,
                price_type: values.priceType,
                offer_margin: values.offerMargin,
                min_trade_limit: values.minimum,
                max_trade_limit: values.maximum,
                offer_time_limit: values.timeLimit,
                offer_tags: values.offerTags,
                offer_label: values.label,
                offer_terms: values.term,
                require_verification: values.isVerified,
                visibility: values.visibility,
                min_trades_required: 5,
                new_user_limit: 100
            }
        );
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : response;
    }
}
export const GetOffers = async () => {
    try {
        const response = await axiosInstance.get('/crypto-ad');
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}


