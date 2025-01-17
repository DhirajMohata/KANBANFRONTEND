import React, { useEffect, useState } from "react";
import CloseSvg from "../../assets/svgs/closeSvg";
import { LuHistory, LuCommand } from "react-icons/lu";
import { addComment } from  "../../../actions/comments/addComment";

interface Comment {
    id: string;
    comment: string;
    date: string;
}

interface TaskDetail {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    comments: any;
}

interface ShowCommentsProps {
    taskDetail: TaskDetail;
    isOpen: boolean;
    onClose: () => void;
}

const ShowComments: React.FC<ShowCommentsProps> = ({ taskDetail, isOpen, onClose }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const formattedComments = taskDetail.comments.map((comment: { comment: any; created_at: any; }, index: any) => {
            const date = new Date(comment.created_at);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return {
            id: String(index),
            comment: comment.comment,
            date: `${formattedDate} ${formattedTime}`,
            };
        });
        setComments(formattedComments);
    } , []);

    const handleAddComment = async () => {
        if (!comment) return;
        await addComment({taskId: taskDetail._id, comment });
        setComments([
            ...comments,
            {
                id: String(comments.length + 1),
                comment,
                date: new Date().toLocaleString(),
            },
        ]);
        setComment("");
    };

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
                <div className="max-w-md mx-auto h-full ">
                    <div className="mb-5 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{taskDetail.title}</h2>
                        <p className="text-gray-600 text-xl dark:text-gray-400">{taskDetail.description}</p>
                        <p className="text-gray-600 text-xl dark:text-gray-400">Deadline: {taskDetail.deadline}</p>
                    </div>
                    <div className="relative pl-8 border-l-2 max-h-[500px] overflow-y-auto hide-scrollbar border-gray-300 dark:border-gray-600">
                        {comments.map((comment) => (
                            <div key={comment.id} className="items-start mb-7">
                                <div className="flex items-start mb-5">
                                    <div className="mr-4 text-2xl text-blue-500 dark:text-blue-300">
                                        <LuCommand />
                                    </div>

                                    <p>{comment.date}</p>
                                </div>
                                <div>
                                    <p className="text-xl text-gray-700 font-semibold dark:text-gray-300 mt-1">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-300"
                            placeholder="Add a comment..."
                        />
                        <button
                            onClick={handleAddComment}
                            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowComments;