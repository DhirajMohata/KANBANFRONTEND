
import axios from "axios";

import { signInUser } from "../../types/actionTypes/signin";

import { toast } from "react-hot-toast";

export const signinUser = (user: signInUser) => {
    const url = "http://localhost:3000/api/auth/login";
    return async () => {
        try {
            const response = await axios.post(url, user);
            const { email, role, token } = response.data;
            
            if(response.status === 200) {
                toast.success("Successfuly Edited", {
                    className:
                      "bg-green-600 text-xl text-white font-semibold px-4 py-3 rounded-lg",
                    icon: "😊",
                    duration: 5000,
                  });
            }
            else {
                toast.error("SignIn Failed!!!");    
                toast.error(response.data);
            }
            toast.success("Signup Success!!!");
            return { email, role, token };
        } catch (error) {
            console.log(error);
        }
    };
}
