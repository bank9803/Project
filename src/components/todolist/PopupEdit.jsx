import React, { useState, useEffect } from 'react';

const PopupEdit = ({ todo, onSave, onClose }) => {
    const [editedTodo, setEditedTodo] = useState({
        title: '',
        text: '',
        timestamp: '',
        status: 'todo',
        index: null
    });

    useEffect(() => {
        if (todo) {
            setEditedTodo({
                ...todo,
                timestamp: todo.timestamp.split(' ')[0]
            });
        }
    }, [todo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...editedTodo,
            timestamp: `${editedTodo.timestamp} `,
            completed: editedTodo.status === 'Done'
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-l from-sky-300 via-violet-500 to-violet-700 p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Todo</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={editedTodo.title}
                            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={editedTodo.text}
                            onChange={(e) => setEditedTodo({ ...editedTodo, text: e.target.value })}
                            placeholder="Text"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <input
                            type="date"
                            value={editedTodo.timestamp}
                            onChange={(e) => setEditedTodo({ ...editedTodo, timestamp: e.target.value })}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        />
                    </div>

                    <div>
                        <select
                            value={editedTodo.status}
                            onChange={(e) => setEditedTodo({ ...editedTodo, status: e.target.value })}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupEdit;