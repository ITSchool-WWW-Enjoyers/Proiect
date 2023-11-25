import React from 'react'
import TodoTask from './TodoTask';

export default function TodoList({tasks, deleteTask, editTask}) {
  return (
    <> 
        <div className="list-container">
            <ul>
                {tasks.map((task, index) => {
                    return (
                        <TodoTask 
                            key={index} 
                            id={index}
                            text={task}
                            deleteTask={deleteTask}
                            editTask={editTask}
                        />
                    )
                })}
            </ul>
        </div>
    </>
  )
}

