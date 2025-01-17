import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

Chart.register(...registerables);

interface Task {
    status: 'todo' | 'inprogress' | 'underreview' | 'finished';
    priority: 'low' | 'medium' | 'urgent';
}

interface AnalyticsProps {
    tasks: Task[];
    isOpen: boolean;
    onClose: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ tasks, isOpen, onClose }) => {
    const statusData = {
        labels: ['To Do', 'In Progress', 'Under Review', 'Finished'],
        datasets: [
            {
                label: 'Task Status',
                data: [
                    tasks.filter(task => task.status === 'todo').length,
                    tasks.filter(task => task.status === 'inprogress').length,
                    tasks.filter(task => task.status === 'underreview').length,
                    tasks.filter(task => task.status === 'finished').length,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderWidth: 1,
                
            },
        ],
    };

    const priorityData = {
        labels: ['Low', 'Medium', 'Urgent'],
        datasets: [
            {
                label: 'Task Priority',
                data: [
                    tasks.filter(task => task.priority === 'low').length,
                    tasks.filter(task => task.priority === 'medium').length,
                    tasks.filter(task => task.priority === 'urgent').length,
                ],
                backgroundColor: ['#0ECC5A', '#FFA235', '#FF6B6B'],
            },
        ],
    };

    return (
        <div
            className={`fixed inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 z-50 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
                <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Task Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4">Task Status</h3>
                        <Pie data={statusData} />
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4">Task Priority</h3>
                        <Bar data={priorityData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;