import React from 'react'

export default function Task({ task, onDeleteTask, onEditTask }) {
    function handleDeleteTask() {
        onDeleteTask(task.taskId);
    }
    function handleEditTask() {
        onEditTask(task.taskId);

    }
    return (
        <React.Fragment>
            <li key={task.taskId}> {task.text}
                <button onClick={handleDeleteTask}>x</button>
                <button onClick={handleEditTask}>edit</button>
            </li>
        </React.Fragment>
    )
}
