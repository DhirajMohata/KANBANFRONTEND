
import axios from "axios";
import { toast } from "react-hot-toast";
import { createProjectType } from "../../types/actionTypes/project";


export const createProject = async (project: createProjectType) => {
    const url = "http://192.168.24.47:3000/api/projects/create";
    try {
        const response = await axios.post(url, project);
        return;
    } catch (error) {
        console.log(error);
        toast.error("Project Creation Failed!!!");
    }
}

export const getProjects = async (email: string) => {
    const url = "http://192.168.24.47:3000/api/projects/";
    try {
        console.log(email);
        const response = await axios.post(url, { email });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("Project fetching Failed!!!");
    }
}

export const getUsers = async () => {
    const url = "http://192.168.24.47:3000/api/projects/users";
    try {
        
        const response = await axios.get(url);
        const users = response.data.map((user: { name: string, id:string }) => {
            return {
                value: user.id,
                title: user.name
            };
        });
        console.log(users);
        return users;
    } catch (error) {
        console.log(error);
        toast.error("User fetching Failed!!!");
    }
}

export const getManagers = async () => {
    const url = "http://192.168.24.47:3000/api/projects/managers";
    try {
        const response = await axios.get(url);
        const managers = response.data.map((manager: { name: string, id: string }) => {
            return {
                value: manager.id,
                title: manager.name
            };
        });
        console.log(managers);
        return managers;
    } catch (error) {
        console.log(error);
        toast.error("Manager fetching Failed!!!");
    }
}

export const getProjectTeamMeambers = async (projectId: string) => {
    const url = `http://192.168.24.47:3000/api/projects/team`;
    try {
        console.log(projectId);
        const response = await axios.post(url, { projectId });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("Team fetching Failed!!!");
    }
}