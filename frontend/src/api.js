import axios from 'axios';

export const fetchApiData = async (url, method = 'GET', params = {}) => {
    try {
        const response = await axios({ method, url, params });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        const statusCode = error.response?.status;
        const message = error.response?.data || error.message;
        throw { statusCode, message };
    }
};
