import React, { useEffect, useState } from 'react';
import CreateProject from './CreateProject';
import ShowProjects from './ShowProjects';
import { Dialog } from '@headlessui/react';
import Confetti from 'react-confetti';

const AdminDashboard: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);


    if(localStorage.getItem('email') === null || localStorage.getItem('email') === undefined) {
        window.location.href = '/auth/signin';
    }

    useEffect(() => {
        if (localStorage.getItem('isFirstTime') === 'true') {
          setIsFirstTime(true)
          localStorage.removeItem('isFirstTime')
        }
      }, [])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {isFirstTime && (
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
            />
            )}
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-14">
                    <h1 className="text-3xl font-bold">WELCOME TO KANBAN : ADMIN</h1>
                    <div className='inline-flex gap-4 items-center'>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Add Project
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/auth/signin';
                            }}
                        >
                            Logout
                        </button>
                    </div>
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