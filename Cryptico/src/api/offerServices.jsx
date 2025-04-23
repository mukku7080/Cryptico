import { axiosInstance } from "./axiosInstance"

export const AddOffer = async (values) => {
    try {
        const response = await axiosInstance.post('/crypto-advertisement/create-crypto-ad',

            {
                cryptocurrency: values.cryptoType,
                transaction_type: values.action,
                payment_type: values.paymentType,
                paymentMethod: values.paymentMethod,
                payment_method_id: values.paymentMethodId,
                price: values.fixedPriceValue,
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
export const GetMyOffer = async (queryParams) => {
    try {
        const response = await axiosInstance.get(`/my-crypto-ad?txn_type=${queryParams?.txn_type}&is_active=${queryParams?.is_active}&cryptocurrency=${queryParams?.cryptocurrency}&per_page=${queryParams?.per_page}`);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const ChangeActiveStatus = async (request) => {
    const value = {
        "id": request.id,
        "is_active": request.is_active
    }
    try {
        const response = await axiosInstance.post('/crypto-advertisement/toggle-cryptoAd-active', value);
        return response;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}


