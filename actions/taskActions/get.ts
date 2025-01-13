require('dotenv').config();

import axios from "axios";

import { toast } from "react-hot-toast";

export const getTasksByProject = (project: string) => {
    const url = process.env.REACT_APP_API_URL + "tasks/project";
    return async () => {
        try {
            const response = await axios.post(url, project);
            if(response.status !== 200) {
                return response.data;
            } else {
                toast.error("Task fetching Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}


export const getTasksByUser = (assigned_to: string) => {
    const url = process.env.REACT_APP_API_URL + "tasks/user";
    return async () => {
        try {
            const response = await axios.post(url, assigned_to);
            if(response.status !== 200) {
                return response.data;
            } else {
                toast.error("Task fetching Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
