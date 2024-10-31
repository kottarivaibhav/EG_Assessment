import React from 'react';

const ToDoItem = ({ task, onToggle, onDelete, onEdit, isEditing, editTaskText, setEditTaskText, onSave }) => {
  return (
    <div
      className={`flex items-center p-2 rounded-lg border ${
        task.completed ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
      }`}
    >
      <div
        className={`mr-3 cursor-pointer ${task.completed ? 'text-green-500' : 'text-gray-500'}`}
        onClick={onToggle}
      >
        {task.completed ? '✓' : '•'}
      </div>
      {isEditing ? (
        <input
          type="text"
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          className={`border rounded-lg p-2 flex-grow ${task.completed ? 'line-through' : ''}`}
        />
      ) : (
        <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
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