import Tasks from './Tasks';

const ManagerDashboard: React.FC = () => {

    if(localStorage.getItem('email') === null || localStorage.getItem('email') === undefined) {
        window.location.href = '/auth/signin';
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto py-5">
                <div className="flex justify-between items-center mb-14">
                    <h1 className="text-2xl font-bold">Project Name</h1>
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
                <Tasks />
            </div>
        </div>
    );
};

export default ManagerDashboard;