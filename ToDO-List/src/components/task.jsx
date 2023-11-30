
import { useState } from 'react';

const Task = ({ task, editTask, deleteTask, completeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
