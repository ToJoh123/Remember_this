import { List, ListItemText, ListItemButton, Grid, ListItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'

export default function TaskComponent({ task }) {

    function handleDeleteTask() {
        console.log("i am so tired, but this button should delete a task with the id of: ", task.ID);
    }
    function openTask() {
        console.log("i am so tired, but this button should open a task with the id of: ", task.ID);
    }
    return (

        <List key={task.ID} className='task-component'>
            <Grid container direction="row" >
                <Grid item xs={4}>
                    <ListItemButton onClick={openTask}> <EditIcon />{task.Text}</ListItemButton>
                </Grid>
                <Grid item xs={2}>
                    <ListItem>{task.Status}</ListItem>
                </Grid>
                <Grid item xs={2}>
                    <ListItemButton onClick={handleDeleteTask}>x</ListItemButton>
                </Grid>
            </Grid>
        </List>

    )
}
