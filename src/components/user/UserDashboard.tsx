import Tasks from './Tasks';

const ManagerDashboard: React.FC = () => {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto py-5">
                <div className="flex justify-between items-center mb-14">
                    <h1 className="text-2xl font-bold">Project Name</h1>
                    
                </div>
                <Tasks />
            </div>
        </div>
    );
};

export default ManagerDashboard;