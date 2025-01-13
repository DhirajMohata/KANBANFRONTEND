require('dotenv').config();

import axios from "axios";

import { toast } from "react-hot-toast";

export const logoutUser = () => {
    const url = process.env.REACT_APP_API_URL + "auth/logout";
    return async () => {
        try {
            const response = await axios.post(url);
            const { email, token } = response.data;
            
            toast.success("Logged out :)");
            return { email, token };
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
