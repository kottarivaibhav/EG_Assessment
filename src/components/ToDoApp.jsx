import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [containerHeight, setContainerHeight] = useState(670); // Initial height

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
      adjustContainerHeight(tasks.length + 1); // Adjust height after adding a task
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
    adjustContainerHeight(updatedTasks.length); // Adjust height after deleting a task
  };

  // Clear all tasks
  const clearTasks = () => {
    setTasks([]);
    adjustContainerHeight(0); // Reset height after clearing tasks
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

  // Adjust container height based on the number of tasks
  const adjustContainerHeight = (taskCount) => {
    const baseHeight = 670; // Base height
    const additionalHeight = 50; // Additional height per task
    const newHeight = baseHeight + taskCount * additionalHeight;
    setContainerHeight(newHeight);
  };

  return (
    <div
      className="bg-white rounded-[32px] shadow-md p-[150px] w-[1000px] ml-[256px] mr-[256px] mt-[120px] mb-[120px]"
      style={{ height: `${containerHeight}px` }}
    >
      <h1 className="text-[44px] font-semibold text-left mb-6 font-rubik w-[360px]" style={{ color: '#11175E' }}>
        Daily To-Do List
      </h1>
      <div className="flex mb-5 h-[55px] relative ml">
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
      <div className="flex justify-between text-gray-600 mt-5 px-4">
        <p><span>{tasks.filter(task => task).length} items</span></p>
        <button onClick={clearTasks} className="text-red-500">Clear All</button>
      </div>
    </div>
  );
};

export default ToDoApp;