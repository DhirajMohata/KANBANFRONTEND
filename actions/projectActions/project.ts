
import axios from "axios";

import { createProjectType } from "../../types/actionTypes/project";


export const createProject = async (project: createProjectType) => {
    const url = "http://localhost:3000/api/projects/create";
    try {
        console.log(project);
        const response = await axios.post(url, project);
        return;
    } catch (error) {
        console.log(error);
    }
}

export const getProjects = async (email: string) => {
    const url = "http://localhost:3000/api/projects/";
    try {
        console.log(email);
        const response = await axios.post(url, { email });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async () => {
    const url = "http://localhost:3000/api/projects/users";
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
    }
}

export const getManagers = async () => {
    const url = "http://localhost:3000/api/projects/managers";
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
    }
}

export const getProjectTeamMeambers = async (projectId: string) => {
    const url = `http://localhost:3000/api/projects/team`;
    try {
        console.log(projectId);
        const response = await axios.post(url, { projectId });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}