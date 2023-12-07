import React, {useState} from 'react';
import EditingTemplate from './EditingTemplate';
import ViewTemplate from './ViewTemplate';

export default function TodoTask({id, text, onDeleteTask, onEditTask}) {
    
    const [isEditing, setIsEditing] = useState(false);

    function hideEditingTemplate () {
        setIsEditing(false);
    }

    function showEditingTemplate () {
        setIsEditing(true);
    }

    return (
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
    );
}