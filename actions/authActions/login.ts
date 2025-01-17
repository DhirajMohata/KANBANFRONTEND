
import axios from "axios";

import { signInUser } from "../../types/actionTypes/signin";

import { toast } from "react-hot-toast";

export const signinUser = (user: signInUser) => {
    const url = "http://192.168.24.47:3000/api/auth/login";
    return async () => {
        try {
            const response = await axios.post(url, user);
            const { email, role, projectId, teamMembers, token } = response.data;

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
            return { email, role, projectId, teamMembers, token };
        } catch (error) {
            console.log(error);
        }
    };
}
