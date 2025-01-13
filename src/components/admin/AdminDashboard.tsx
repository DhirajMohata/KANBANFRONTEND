import React, { useState } from 'react';
import CreateProject from './CreateProject';
import ShowProjects from './ShowProjects';
import { Dialog } from '@headlessui/react';

const AdminDashboard: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-14">
                    <h1 className="text-3xl font-bold">WELCOME TO KANBAN : ADMIN</h1>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Add Project
                    </button>
                </div>

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <CreateProject onClose={() => setIsDialogOpen(false)} isOpen />
                </Dialog>
                <ShowProjects />
            </div>
        </div>
    );
};

export default AdminDashboard;