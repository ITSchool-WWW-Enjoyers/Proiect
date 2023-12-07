import React from 'react'
import TodoTask from './TodoTask';

export default function TodoList({tasks, onDeleteTask, onEditTask}) {
    return (
        <div className="list-container">
            <ul>
                {tasks.map((task, index) => {
                    return (
                        <TodoTask 
                            key={index} 
                            id={index}
                            text={task}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                        />
                    )
                })}
            </ul>
        </div>
    );
}

