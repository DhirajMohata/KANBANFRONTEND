require('dotenv').config();

import axios from "axios";

import { createProjectType } from "../../types/actionTypes/project";

import { toast } from "react-hot-toast";

export const createProject = (project: createProjectType) => {
    const url = process.env.REACT_APP_API_URL + "projects/create";
    return async () => {
        try {
            const response = await axios.post(url, project);
            if(response.status !== 200) {
                toast.success("Project Created!!!");
            } else {
                toast.error("Project Creation Failed!!!");
            }
            return;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}

export const getProjects = (admin_id: string) => {
    const url = process.env.REACT_APP_API_URL + "projects";
    return async () => {
        try {
            const response = await axios.post(url, admin_id);
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
        }
    };
}
