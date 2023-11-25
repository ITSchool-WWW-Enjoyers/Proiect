import React, { useState } from 'react';

export default function InputArea({addTask}) {

    const [inputText, setInputText] = useState("");

    function handleSubmit (event) {
        event.preventDefault();
    };

    function handleChange (event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }
 
    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input 
                        name="text"
                        onChange={handleChange}
                        type="text" 
                        placeholder="Enter new task..."
                        value={inputText}
                    />
                    <button 
                        type="submit"
                        onClick={() => {
                            if (inputText !== "") {
                                addTask(inputText);
                                setInputText("");
                            }
                        }}
                    >
                    <span>Add</span>
                    </button>
                </form>
            </div>
        
        </>
    );
}

