import React, {useState} from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export default function TodoTask({text, onDeleteTask, onEditTask, id}) {
    
    const [isEditing, setEditing] = useState(false);
    const [newInputText, setNewInputText] = useState("");
    const [isDone, setIsDone] = useState(false);

    function handleChange(event) {
        setNewInputText(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
    };

    function handleClick () {
        setIsDone(!isDone);
    }

    const editingTemplate = (
        <div className="edit-form">
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange}
                    type="text" 
                    value={newInputText}
                />
                <button 
                    className="edit-button"
                    type="submit"
                    onClick={() => {
                        if (newInputText !== "") {
                            onEditTask(id, newInputText);
                            setEditing(false);
                        }
                    }}
                >
                <span>Edit</span>
                </button>
            </form>
        </div>
    );

    const viewTemplate = (
        <div className="task-container">
            <div style={{textDecoration: isDone ? "line-through red" : "none"}}>
                {text}
            </div>
            <div className='btn-group'>
                <FaRegCheckCircle
                    className="check-btn"
                    onClick={handleClick}
                />
                <FaRegEdit
                    className="edit-btn"
                    onClick={() => { 
                        setEditing(true);
                        setNewInputText(text);
                    }}
                />
                <RiDeleteBinLine 
                    className="delete-btn"
                    onClick={() => {
                        onDeleteTask(id)
                    }}
                />
            </div>
        </div>
    );

    return (
        <>
            <li>
                {isEditing ? editingTemplate : viewTemplate}
            </li>
        </>
    );
}