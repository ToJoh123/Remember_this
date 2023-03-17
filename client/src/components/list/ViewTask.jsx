import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'

export default function ViewTask({ task, onDelete }) {


    function handleTaskClick() {
        console.log('task clicked')
    }
    function handleTaskDelete() {
        onDelete(task.ID);
    }
    return (
        <ListItem key={task.ID}>
            <ListItemButton onClick={handleTaskClick}>
                <ListItemText primary={task.Text} />
            </ListItemButton>
            <IconButton>
                <DeleteIcon onClick={handleTaskDelete} />
            </IconButton>
        </ListItem>
    )
}
