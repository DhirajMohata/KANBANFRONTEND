import React from 'react';
import ProjectCard from './ProjectCard';

const ShowProjects: React.FC = () => {
    const projects = [
        { id: 1, name: 'Project One', description: 'This is the first project' },
        { id: 2, name: 'Project Two', description: 'This is the second project' },
        { id: 1, name: 'Project One', description: 'This is the first project' },
        { id: 2, name: 'Project Two', description: 'This is the second project' },
        { id: 1, name: 'Project One', description: 'This is the first project' },
        { id: 2, name: 'Project Two', description: 'This is the second project' },
        { id: 1, name: 'Project One', description: 'This is the first project' },
        { id: 2, name: 'Project Two', description: 'This is the second project' },
        // Add more projects as needed
    ];

    return (
        <div className="bg-white rounded-xl shadow-xl dark:bg-gray-800 min-h-[710px] p-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                    <ProjectCard name={project.name} description={project.description} />
                ))}
            </div>
        </div>
    );
};

export default ShowProjects;