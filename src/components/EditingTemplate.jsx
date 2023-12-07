import React, { useState } from 'react'

export default function EditingTemplate({id, previousTask, onEditTask, onHideEditingTemplate}) {

    const [newInputText, setNewInputText] = useState(previousTask);

    function handleChange(event) {
        setNewInputText(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
    };

    return (
        <>
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        onChange={handleChange}
                        type="text" 
                        placeholder="Update Task"
                        value={newInputText}
                    />
                    <button 
                        className="edit-button"
                        type="submit"
                        onClick={() => {
                            if (newInputText !== "") {
                                onEditTask(id, newInputText);
                                onHideEditingTemplate();
                            }
                        }}
                    >
                        <span>Edit</span>
                    </button>
                </form>
            </div>
        </>    
    )
}

