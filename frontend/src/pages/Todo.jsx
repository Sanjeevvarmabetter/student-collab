import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Generate random tasks
        const randomTasks = generateRandomTasks();
        setTasks(randomTasks);
    }, []);

    // Function to generate 5 random tasks for CSE students
    const generateRandomTasks = () => {
        const cseTasks = [
            "Implement binary search",
            "Design database schema",
            "Write recursive factorial",
            "Create web application",
            "Implement sorting algorithm",
            "Design RESTful API",
            "Write test cases",
            "Develop CRUD application",
            "Create class diagram",
            "Implement graph data structure"
        ];

        const randomTasks = [];
        const totalTasks = cseTasks.length;
        const uniqueIndices = new Set();

        while (uniqueIndices.size < 5) {
            const randomIndex = Math.floor(Math.random() * totalTasks);
            uniqueIndices.add(randomIndex);
        }

        uniqueIndices.forEach(index => {
            randomTasks.push({ _id: index.toString(), text: cseTasks[index], completed: false });
        });

        return randomTasks;
    };

    const handleAddTask = () => {
        if (newTask.trim() === '') return;

        const newTaskObj = {
            _id: Math.random().toString(36).substring(7), // Generate a random ID
            text: newTask,
            completed: false
        };

        setTasks([...tasks, newTaskObj]);
        setNewTask('');
    };

    const handleToggleTask = (taskId) => {
        setTasks(tasks.map(task => (task._id === taskId ? { ...task, completed: !task.completed } : task)));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return (
        <div className="h-screen w-screen bg-[#071e34] flex flex-col items-center justify-between">
            <div className="flex flex-grow items-center justify-center text-gray-600">
                <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
                <a className='text-red-700 text-3xl' href="/">Home</a>
                    <div className="mt-5 flex items-center mb-6">
                        <svg className="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h4 className="font-semibold ml-3 text-lg">My Tasks</h4>
                    </div>
                    {tasks.map(task => (
                        <div key={task._id} className="flex justify-between items-center">
                            <div>
                                <input className="hidden" type="checkbox" id={`task_${task._id}`} checked={task.completed} onChange={() => handleToggleTask(task._id)} />
                                <label className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100" htmlFor={`task_${task._id}`}>
                                    <span className={`flex items-center justify-center w-5 h-5 text-transparent border-2 rounded-full ${task.completed ? 'border-green-500' : 'border-gray-300'}`}>
                                        {task.completed && (
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="ml-4 text-sm">{task.text}</span>
                                </label>
                            </div>
                            <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleDeleteTask(task._id)}>
                                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 011 1v1a3 3 0 01-3 3H9a3 3 0 01-3-3V6a1 1 0 011-1h2V4zm3 2v10a1 1 0 002 0V6h3v10a1 1 0 001 1h-8a1 1 0 001-1V6h3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded" onClick={handleAddTask}>
                        <svg className="w-5 h-5 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <input className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text" placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todo;
