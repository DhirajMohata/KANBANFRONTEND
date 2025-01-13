import React from 'react';

interface ProjectCardProps {
    name: string;
    description: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ name, description }) => {
    return (
        <div onClick={() => location.href = 'admin/tasks'} className="bg-gray-200 dark:bg-gray-600 shadow-md rounded-lg p-4 hover:bg-slate-300 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{name}</h3>
            <p className="text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs" title={description}>
                {description}
            </p>
        </div>
    );
};

export default ProjectCard;
