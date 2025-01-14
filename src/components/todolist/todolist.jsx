import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSort } from 'react-icons/fa'
import PopupEdit from './PopupEdit' // Import PopupEdit

const statusLabels = {
    'todo': 'Todo',
    'in-progress': 'In Progress',
    'done': 'Done'
}

const getStatusBadge = (status) => {
    switch (status) {
        case 'Todo':
            return '🔵';
        case 'In Progress':
            return '🟡';
        case 'Done':
            return '🟢';
        default:
            return '🔵';
    }
}

const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Todo':
            return 'text-blue-800 bg-blue-200';
        case 'In Progress':
            return 'text-yellow-600 bg-yellow-100';
        case 'Done':
            return 'text-green-800 bg-green-200';
        default:
            return 'text-blue-800 bg-blue-200';
    }
}

function Todolist() {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    // const [time, setTime] = useState('')
    const [status, setStatus] = useState('todo')
    const [isEditing, setIsEditing] = useState(false)
    const [currentTodo, setCurrentTodo] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
    const [sortOrder, setSortOrder] = useState('descending');
    const [showPopup, setShowPopup] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const changeStatus = (index) => {
        const updatedTodos = todos.map((todo, i) => {
            if (i === index) {
                const nextStatus = todo.status === statusLabels['todo'] ? 'in-progress' :
                    todo.status === statusLabels['in-progress'] ? 'done' : 'todo';
                return {
                    ...todo,
                    status: statusLabels[nextStatus],
                    completed: nextStatus === 'done'
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const addTodo = () => {
        if (!title || !date) {
            alert('Please fill in fields.')
            return
        }
        const timestamp = `${date} `
        if (isEditing) {
            const updatedTodos = todos.map((todo, index) =>
                index === currentTodo ? { title, text, timestamp, status: statusLabels[status], completed: status === 'done' } : todo
            )
            setTodos(updatedTodos)
            setIsEditing(false)
            setCurrentTodo(null)
            setSuccessMessage('Todo updated successfully!')
        } else {
            setTodos([...todos, { title, text, timestamp, status: statusLabels[status], completed: status === 'done' }])
            setSuccessMessage('Todo added successfully!')
        }
        setTitle('')
        setText('')
        setDate('')
        // setTime('')
        setStatus('todo')
        setTimeout(() => setSuccessMessage(''), 3000)
        console.log('Added todo:', { title, text, timestamp, status: statusLabels[status], completed: status === 'done' })
    }

    const editTodo = (index) => {
        setTodoToEdit({ ...todos[index], index });
        setShowPopup(true);
        console.log('Edit todo:', todos[index])
    };

    const handleSave = (updatedTodo) => {
        const updatedTodos = todos.map((todo, i) =>
            i === updatedTodo.index ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        setShowPopup(false);
    };

    const deleteTodo = (index) => {
        const deleteTodo = todos.filter((_, i) => i !== index)
        setTodos(deleteTodo)
        console.log('Delete Success!')
    }

    const sortDate = () => {
        const sortedTodos = [...todos].sort((a, b) =>
            sortOrder === 'descending' ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setTodos([...sortedTodos]);
        setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');
        console.log('Sortdate :', sortedTodos);
        console.log('SortOrder :', sortOrder);
    };

    const isWeekend = (dateStr) => {
        const date = new Date(dateStr);
        return date.getDay() === 0 || date.getDay() === 6;
    }

    // const formatAMPM = (dateString) => {
    //     const date = new Date(dateString)
    //     let hours = date.getHours()
    //     const minutes = date.getMinutes()
    //     const ampm = hours >= 12 ? 'PM' : 'AM'
    //     hours = hours % 12
    //     hours = hours ? hours : 12
    //     const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm
    //     return strTime
    // }

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? {
                ...todo,
                completed: !todo.completed,
                status: !todo.completed ? statusLabels['done'] : statusLabels['todo']
            } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div className='max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-l from-violet-300 via-violet-500 to-violet-700 rounded-lg shadow-lg'>
            <h1 className="text-5xl font-bold mb-6 text-center text-black-700">Todo List</h1>

            {successMessage && (
                <p className='text-green-500 bold text-lg text-center mb-4'>{successMessage}</p>
            )}

            <div className="flex flex-col md:flex-row mb-4">
                <input
                    type="text"
                    className="flex-1 p-4 border rounded mr-2 mb-2 md:mb-0 text-lg"
                    placeholder="Topic"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="flex-1 p-4 border rounded mb-2 md:mb-0 text-lg"
                    placeholder="Content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="flex flex-col md:flex-row mb-4">
                <input
                    type="date"
                    className="mr-2 mb-2 md:mb-0 flex-1 p-4 border rounded text-lg"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                {/* <input
                    type="time"
                    className="mr-2 mb-2 md:mb-0 flex-1 p-4 border rounded text-lg"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                /> */}
                <select
                    className="flex-1 p-4 border rounded text-lg"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="flex justify-between space-x-4">
                <button
                    onClick={sortDate}
                    className="flex items-center px-5 py-3 bg-sky-500 hover:bg-sky-800 text-white rounded-md drop-shadow-md transition-colors duration-200"
                >
                    <FaSort className="mr-2" /> Sort by Date
                </button>
                <button
                    onClick={addTodo}
                    className="flex items-center px-5 py-3 bg-green-500 hover:bg-green-800 text-white rounded-md drop-shadow-md transition-colors duration-200"
                >
                    <FaPlus className="mr-2" /> Add Todo
                </button>
            </div>

            <div className='max-w-2xl mx-auto mt-6 p-6 bg-white rounded shadow-lg'>
                <ul>
                    <h3 className='text-3xl font-bold mb-6 text-center text-black-700'>List</h3>
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between border mb-4 p-4 rounded shadow transition-colors duration-200
                                ${isWeekend(todo.timestamp.split(' ')[0]) ? 'bg-gray-100' : 'bg-white'}`}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed || false}
                                onChange={() => toggleComplete(index)}
                                className="mr-2 peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                            />
                            <div className="flex-1">
                                <h2 className={`uppercase text-xl ${todo.completed ? 'line-through' : ''} text-blue-700`}>
                                    Topic: {todo.title}
                                </h2>
                                <h4 className={`text-lg ${todo.completed ? 'line-through' : ''} text-blue-700`}>
                                    Content: {todo.text}
                                </h4>
                                <p className={`text-lg ${todo.completed ? 'line-through' : ''} text-blue-700`}>
                                    Date: <small>{new Date(todo.timestamp).toLocaleDateString()} </small>
                                </p>
                                <span
                                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeStyle(todo.status)}`}
                                    onClick={() => changeStatus(index)}
                                >
                                    {getStatusBadge(todo.status)} {todo.status}
                                </span>
                            </div>
                            <div className="flex-shrink-0 flex items-center space-x-2">
                                <button
                                    onClick={() => editTodo(index)}
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600 text-lg flex items-center transition-colors duration-200"
                                >
                                    <FaEdit className="mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => deleteTodo(index)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 text-lg flex items-center transition-colors duration-200"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {showPopup && (
                <PopupEdit
                    todo={todoToEdit}
                    onSave={handleSave}
                    onClose={() => setShowPopup(false)}
                    toggleComplete={toggleComplete}
                />
            )}
        </div>
    )
}

export default Todolist