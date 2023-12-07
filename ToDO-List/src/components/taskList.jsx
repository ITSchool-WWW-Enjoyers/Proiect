import React from 'react';
import Task from '../components/task';

const TaskList = ({ tasks, deleteTask, completeTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} 
        task={task}
        deleteTask={deleteTask} 
        completeTask={completeTask} />
      ))}
    </ul>
  );
};

export default TaskList;
