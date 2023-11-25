import React, { useEffect, useState } from 'react';
import Heading from './components/Heading.jsx';
import InputArea from './components/InputArea.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';


export default function App() {

  //get data from localstorage
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("tasks")
    if (localValue == null){
      return [];
    }else{
      return JSON.parse(localValue)
    }
  });

  //save data in localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);
 
  function addTask(inputText) {
    const updatedTaskList = [...tasks, inputText];
    setTasks(updatedTaskList);
  }

  function deleteTask(id) {
    const filteredTaskList = tasks.filter((task, index) => {
      if (index !== id){
        return true;
      }else{
        return false;
      }
    });
    setTasks(filteredTaskList);
  } 

  function editTask(id, newInputText) {
    const editedTaskList = tasks.map((task, index) => {
      if (index === id) {
        return newInputText;
      }else{
        return task;
      }
    });
    setTasks(editedTaskList);
  }

  return (
    <> 
      <div className="container">
        <Heading/>
        <InputArea 
          addTask={addTask}
        />
        <TodoList 
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </>
  );
}
