import React, { useState } from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export default function ViewTemplate({id, text, onDeleteTask, onShowEditingTemplate}) {

    const [isDone, setIsDone] = useState(false);

    function handleClick () {
        setIsDone(!isDone);
    }

    return (
        <>
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
                            onShowEditingTemplate();
                        }}
                    />
                    <RiDeleteBinLine 
                        className="delete-btn"
                        onClick={() => {
                            onDeleteTask(id);
                        }}
                    />
                </div>
            </div>
        </>

    )
}

