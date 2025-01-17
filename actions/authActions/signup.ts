import axios from "axios";

import { signUpUser } from "../../types/actionTypes/signup";

import { toast } from "react-hot-toast";

export const signupUser = (user: signUpUser) => {
    const url = "http://192.168.24.47:3000/api/auth/signup";
    return async () => {
        try {
            const response = await axios.post(url, user);
            const { email, role, token, projectId, teamMembers} = response.data;

            if(response.status === 201) {
                toast.success("Signup Success!!!");
            }
            else {
                toast.error("Signup Failed!!!");
                toast.error(response.data);
            }
            
            toast.success("Signup Success!!!");
            return { email, role, projectId, token, teamMembers};
        } catch (error) {
            console.log(error);
        }
    };
}
