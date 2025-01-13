require('dotenv').config();

import axios from "axios";

import { toast } from "react-hot-toast";

export const deleteTask = ({ taskId }) => {
    const url = process.env.REACT_APP_API_URL + "tasks/delete";
    return async () => {
        try {
            const response = await axios.put(url, { taskId });
            if(response.status !== 200) {
                toast.success("Task Created!!!");
            } else {
                toast.error("Task Creation Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}