import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

export default function viewTask({ task }) {
    function handleTaskClick() {
        console.log('task clicked')
    }
    function handleTaskDelete() {
        console.log('task deleted')
    }
    return (
        <ListItem key={task.ID}>
            <ListItemButton onClick={handleTaskClick}>
                <ListItemText primary={task.Text} />
                <DeleteIcon onClick={handleTaskDelete} />
            </ListItemButton>
        </ListItem>
    )
}
