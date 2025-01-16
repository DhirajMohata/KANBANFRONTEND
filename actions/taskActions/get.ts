
import axios from "axios";

import { toast } from "react-hot-toast";

export const getTasksByProject = async (projectId: string) => {
    const url = "http://localhost:3000/api/tasks/project";
        try {
            const response = await axios.post(url, {projectId});
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }


export const getTasksByUser = async (assigned_to: string) => {
    const url = "http://localhost:3000/api/tasks/user";
        try {
            const response = await axios.post(url, assigned_to);
            if(response.status !== 200) {
                return response.data;
            } else {
                toast.error("Task fetching Failed!!!");
            }
            return;
        } catch (error) {
            console.log(error);
        }
}

export const getTasksByManager = async (assigned_by: string) => {
    const url = "http://localhost:3000/api/tasks/manager";
        try {
            const response = await axios.post(url, assigned_by);
            if(response.status !== 200) {
                return response.data;
            } else {
                toast.error("Task fetching Failed!!!");
            }
            return;
        } catch (error) {
            console.log(error);
        }
}
