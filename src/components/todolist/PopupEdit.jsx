import React, { useState } from 'react';

function PopupEdit({ todo, onSave, onClose, toggleComplete }) {
    const [title, setTitle] = useState(todo.title);
    const [text, setText] = useState(todo.text);
    const [date, setDate] = useState(todo.timestamp.split(' ')[0]);
    const [status, setStatus] = useState(todo.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...todo,
            title,
            text,
            timestamp: `${date} `,
            status,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-l from-sky-300 via-violet-500 to-violet-700 p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Edit Todo</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border rounded"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text"
                    />
                    <input
                        type="date"
                        className="w-full p-2 mb-4 border rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        className="w-full p-2 mb-4 border rounded"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-rose-500 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopupEdit;