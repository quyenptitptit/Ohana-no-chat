import axios from "axios";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // return error.response.data;
        throw error;
    }
);

export default axiosClient;
