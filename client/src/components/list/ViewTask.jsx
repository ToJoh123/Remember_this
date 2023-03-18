import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'

export default function ViewTask({ task, onDeleteTask }) {


    function handleTaskClick() {
        console.log('You have clicked on task with ID: ', task.ID, ' and text: ', task.Text)
    }
    function handleTaskDelete() {
        onDeleteTask(task.ID);
    }
    return (
        <ListItem key={task.ID}>
            <ListItemButton onClick={handleTaskClick}>
                <ListItemText primary={task.Text} />
            </ListItemButton>
            <IconButton onClick={handleTaskDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
