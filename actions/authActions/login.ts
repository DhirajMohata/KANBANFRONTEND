require('dotenv').config();

import axios from "axios";

import { signInUser } from "../../types/actionTypes/signin";

import { toast } from "react-hot-toast";

export const signinUser = (user: signInUser) => {
    const url = process.env.REACT_APP_API_URL + "auth/login";
    return async () => {
        try {
            const response = await axios.post(url, user);
            const { email, token } = response.data;
            
            toast.success("Logged in Success!!!");
            return { email, token };
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
