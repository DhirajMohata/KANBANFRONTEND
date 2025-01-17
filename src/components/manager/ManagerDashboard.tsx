import React, { useState } from 'react';
import AddTask from './AddTask';
import Tasks from './Tasks';

const ShowTaskPage: React.FC = () => {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [addedTask, setAddedTask] = useState<boolean>(false);

    if(localStorage.getItem('email') === null || localStorage.getItem('email') === undefined) {
        window.location.href = '/auth/signin';
    }

    const handleAddTaskClick = () => {
        setIsAddTaskOpen(true);
    };

    const handleCloseAddTask = () => {
        setIsAddTaskOpen(false);
        setAddedTask(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto py-5">
                <div className="flex justify-between items-center mb-14">
                    <h1 className="text-2xl font-bold">Project Name</h1>
                    <div className='inline-flex gap-4 items-center'>
                        <button
                            onClick={handleAddTaskClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Task
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
                <Tasks AddTask={addedTask}/>
            </div>
            {isAddTaskOpen && <AddTask 
                title="To Do"
                isOpen={isAddTaskOpen}
                onClose={handleCloseAddTask}
                />
            }
        
        </div>
    );
};

export default ShowTaskPage;