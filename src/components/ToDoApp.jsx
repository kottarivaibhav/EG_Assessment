import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Toggle task completion status
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  // Edit a task
  const editTask = (index) => {
    setIsEditing(index);
    setEditTaskText(tasks[index].text);
  };

  // Save a task
  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditTaskText('');
  };

  // Handle key press for adding a task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-md p-[150px] w-[1000px] h-[670px] ml-[256px] mr-[256px] mt-[120px] mb-[120px]">
      <h1 className="text-[44px] font-semibold text-left mb-6 font-rubik w-[360px]" style={{ color: '#11175E' }}>
        Daily To-Do List
      </h1>
      <div className="flex mb-4 relative ml">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new list item"
          className="border rounded-lg flex-grow p-2 pr-16 h-[110]"
        />
        <button
          onClick={addTask}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <ToDoItem
            key={index}
            task={task}
            onToggle={() => toggleComplete(index)}
            onDelete={() => deleteTask(index)}
            onEdit={() => editTask(index)}
            isEditing={isEditing === index}
            editTaskText={editTaskText}
            setEditTaskText={setEditTaskText}
            onSave={() => saveTask(index)}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-gray-600 mt-14">
        <p><span>{tasks.filter(task => task).length} items</span></p>
        <button onClick={clearTasks} className="text-red-500">Clear All</button>
      </div>
    </div>
  );
};

export default ToDoApp;