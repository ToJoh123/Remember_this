import { Button, Card, CardActions, CardContent, List, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState, useEffect } from 'react'
import ViewTask from './ViewTask'
import DeleteIcon from '@mui/icons-material/Delete';
import deleteTask from '../../functions/WelcomePage/DeleteTask';


export default function ViewList({ list, onDelete }) {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        function fetchData() {
            setTasks(list.Task)
        }
        return () => {
            fetchData();
        }
    }, [list.Task])


    function handleCreateTask() {
        console.log('create task', list.Task)
        const newID = list.Task.length + 1
        const newTaskName = 'new task'
        const newTask = {
            ID: newID,
            Text: newTaskName,
            Completed: false
        }
        setTasks(tasks => [
            ...tasks,
            newTask
        ])

    }
    function handleDeleteList() {
        onDelete(list.ID);
    }
    function handleDeleteTask(TaskID) {
        //copy the tasks array and filter out the task with the same ID as the TaskID
        console.log(tasks)
        setTasks(tasks => tasks.filter(task => task.ID !== TaskID))
        deleteTask(list.ID, TaskID)
    }
    return (
        <Container key={list.ID}>
            <Card>
                <CardActions>
                    <Button variant="contained" onClick={handleDeleteList}><DeleteIcon /></Button>

                    <TextField />
                    <Button variant="contained" onClick={handleCreateTask}>Create</Button>

                </CardActions>
                <Typography>{list.ListName}</Typography>
                <CardContent>
                    <List>
                        {list.Task.map(task => {
                            return (
                                <ViewTask key={task.ID} task={task} onDelete={handleDeleteTask} />
                            )
                        }
                        )}
                    </List>
                </CardContent>

            </Card>
        </Container>
    )
}
