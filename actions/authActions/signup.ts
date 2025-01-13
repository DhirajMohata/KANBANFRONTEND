require('dotenv').config();

import axios from "axios";

import { signUpUser } from "../../types/actionTypes/signup";

import { toast } from "react-hot-toast";

export const signupUser = (user: signUpUser) => {
    const url = process.env.REACT_APP_API_URL + "auth/signup";
    return async () => {
        try {
            const response = await axios.post(url, user);
            const { email, token } = response.data;
            
            toast.success("Signup Success!!!");
            return { email, token };
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
