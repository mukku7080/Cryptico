import { axiosInstance } from "./axiosInstance";


export const getOtherService = async () => {
    try {
        const response = await axiosInstance.get("/countries/currency");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const getCountrycode = async () => {
    try {
        const response = await axiosInstance.get("/countries/dialing-code");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const AddSecurityQuestions = async (values) => {
    const { answer0, answer1, answer2, question0, question1, question2 } = values;

    try {

        const response = await axiosInstance.post("/security-questions",
            {
                questions: [
                    {
                        question_order: 1,
                        question: question0,
                        answer: answer0,
                    },
                    {
                        question_order: 2,
                        question: question1,
                        answer: answer1,
                    },
                    {
                        question_order: 3,
                        question: question2,
                        answer: answer2,
                    }
                ]
            }
        )
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getLoginHistory = async () => {
    try {
        const response = await axiosInstance.get("/login-history");
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}