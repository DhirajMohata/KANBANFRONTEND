import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../../actions/projectActions/project';

const ShowProjects: React.FC = () => {
    const [projects, setProjects] = useState<any>([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
            const email = localStorage.getItem('email');
            console.log(email);
            if (!email ) return;
            const project = await getProjects(email);
            if (!project) return;
            setProjects(project);
        };
        fetchProjects();
    }
    , []);
    

    return (
        <div className="bg-white rounded-xl shadow-xl dark:bg-gray-800 min-h-[710px] p-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project: { name: any; description: any; _id: any; teamMembers: any;}) => (
                    <ProjectCard name={project.name} description={project.description} projectId = {project._id} teamMembers = {project.teamMembers}/>
                ))}
            </div>
        </div>
    );
};

export default ShowProjects;