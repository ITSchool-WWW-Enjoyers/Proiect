import React, {useState} from 'react';
import EditingTemplate from './EditingTemplate';
import ViewTemplate from './ViewTemplate';

export default function TodoTask({id, text, onDeleteTask, onEditTask}) {
    
    const [isEditing, setEditing] = useState(false);

    function hideEditingTemplate () {
        setEditing(false);
    }

    function showEditingTemplate () {
        setEditing(true);
    }

    return (
        <>
            <li>
                {isEditing ? (
                    <EditingTemplate
                        id={id}
                        previousTask={text}
                        onEditTask={onEditTask}
                        onHideEditingTemplate={hideEditingTemplate}
                    />
                ) : (
                    <ViewTemplate
                        id={id}
                        text={text}
                        onDeleteTask={onDeleteTask}
                        onShowEditingTemplate={showEditingTemplate}
                    />
                )}
            </li>
        </>
    );
}