import React, { useState } from 'react';

const ToDoItem = ({ task, onToggle, onDelete, onEdit, isEditing, editTaskText, setEditTaskText, onSave }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center p-3 mt-4  rounded-lg border ${
        task.completed ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="mr-3 cursor-pointer form-checkbox h-5 w-5 text-green-500"
      />
      {isEditing ? (
        <input
          type="text"
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          className={`border rounded-lg p-2 flex-grow ${task.completed ? 'line-through' : ''}`}
        />
      ) : (
        <span
          className={`flex-grow ${task.completed ? 'line-through' : ''} ${isHovered ? 'text-[#2D70FD]' : ''}`}
        >
          {task.text} {task.completed && '(done)'}
        </span>
      )}
      <div className="ml-auto flex space-x-2">
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="bg-green-500 text-white px-2 py-1 rounded-lg"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoItem;