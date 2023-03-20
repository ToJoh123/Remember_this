import React from 'react';
import ListForm from './ListForm';
import Task from './Task'

export default function List({ listItem, onDeleteList, onEditList, onAddTask, setActiveList, activeList, childOnDeleteTask, onEditTask }) {
    const isEditing =
        activeList &&
        activeList.id === listItem.listId &&
        activeList.type === "edit";

    const isItemType =
        activeList &&
        activeList.id === listItem.listId &&
        activeList.type === "task";

    const isEditingTask =
        activeList &&
        activeList.id === listItem.listId &&
        activeList.type === "edit-task";

    function handleDeleteList() {
        onDeleteList(listItem.listId);
    }


    function handleDeleteTask(taskID) {
        childOnDeleteTask(listItem.litId, taskID);
    }
    function handleEditTask(taskID) {
        setActiveList({ id: listItem.listId, taskId: taskID, type: "edit-task" });
    }

    return (
        <ul>
            <p>{listItem.listName}</p>

            <button onClick={handleDeleteList}>x</button>
            <button onClick={() => setActiveList({ id: listItem.listId, type: "edit" })}>edit list</button>
            <button onClick={() => setActiveList({ id: listItem.listId, type: "task" })}>add task</button>
            {isEditing && <ListForm
                submitLabel="edit list"
                handleSubmit={(text) => onEditList(listItem.listId, text)}
                handleCancel={() => { setActiveList(null) }}
                initialText={listItem.listName}
                hasCancelButton
            />
            }
            {isItemType && <ListForm submitLabel="add task"
                handleSubmit={(text) => onAddTask(listItem.listId, text)}
                handleCancel={() => { setActiveList(null) }}
                hasCancelButton
            />
            }
            {isEditingTask && <ListForm submitLabel="edit task"
                handleSubmit={(text) => onEditTask(listItem.listId, activeList.taskId, text)} //get text from form, and sending listID and taskID to parent
                handleCancel={() => { setActiveList(null) }}
                initialText={listItem.tasks.find((task) => task.taskId === activeList.taskId).text}
                hasCancelButton
            />
            }
            {listItem.tasks?.map((task) => (
                <Task key={task.taskId} task={task} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
            ))}
        </ul>
    )
}
