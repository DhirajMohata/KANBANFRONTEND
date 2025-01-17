import CloseSvg from "../../assets/svgs/closeSvg";
import React, { useEffect, useState } from "react";
import { LuHistory } from "react-icons/lu";

interface Log {
    id: string;
    description: string;
    date: string;
    icon: JSX.Element;
}

interface ShowLogsProps {
    log: any;
    isOpen: boolean;
    onClose: () => void;
}

const ShowLogs: React.FC<ShowLogsProps> = ({ log, isOpen, onClose }) => {
    const [logs, setLogs] = useState<Log[]>([]);
    useEffect(() => {
        if (log) {
            const logs = Object.keys(log).map((key) => {
                const date = new Date(log[key].created_at);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString();
                return {
                    id: key,
                    description: log[key].action,
                    date: `${formattedDate} ${formattedTime}`,
                    icon: <LuHistory />,
                };
            });
            setLogs(logs);
        }
    }, []);
    return (
        <div
        className={`fixed inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 z-50 flex items-center justify-center transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
            <div className="p-9 pr-11 fixed top-0 right-0 h-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out">
                <div className="flex justify-end items-center mb-5 border-gray-400 dark:border-gray-600">
                    <button
                    className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    onClick={onClose}
                    >
                    <CloseSvg />
                    </button>
                </div>
                <div className="max-w-md mx-auto h-[720px] overflow-y-auto hide-scrollbar">
                    <div className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-600">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start mb-7">
                                <div className="mr-4 text-2xl text-blue-500 dark:text-blue-300">{log.icon}</div>
                                <div><p className="text-xl mb-3 text-gray-500 dark:text-gray-400">{log.date}</p>
                                    {log.description && (
                                        <p className="text-xl text-gray-700 dark:text-gray-300 mt-1">{log.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowLogs;