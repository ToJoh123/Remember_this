import { Button, Card, CardActions, CardContent, List, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState, useEffect } from 'react'
import ViewTask from './ViewTask'
import DeleteIcon from '@mui/icons-material/Delete';
import { addTaskMockServer, getTasksMockServer } from '../../data/mockServer';
// const { data } = require('../../data/listExampleData.js')
const userID = 1
export default function ViewList({ listData, onDeleteList }) {
    const [taskData, setTaskdata] = useState([])
    const [taskInput, setTaskInput] = useState('')

    useEffect(() => {
        function fetchData() {
            setTaskdata(getTasksMockServer(userID, listData.ID))
        }
        return () => {
            fetchData();
        }
    }, [])
    function getTasks() {
        setTaskdata(getTasksMockServer(userID, listData.ID))
    }
    function handleCreateTask() {
        setTaskdata(taskData => ({
            ...taskData,
            Task: [
                ...taskData.Task,
                {
                    ID: taskData.Task.length + 1,
                    TaskName: taskInput
                }
            ]
        }))
        getTasks()
        addTaskMockServer(userID, listData.ID, taskInput)
        console.log("create task with text", taskInput, taskData)
    }

    function handleDeleteList() {
        onDeleteList(listData.ID);
    }
    function handleDeleteTask(taskID) {
        console.log("delete task with id", taskID)
    }
    return (
        <Container key={listData.ID} >
            <Card>
                <CardActions>
                    <Button variant="contained" onClick={handleDeleteList}><DeleteIcon /></Button>

                    <TextField onChange={(e) => {
                        setTaskInput(e.target.value)
                    }} />
                    <Button variant="contained" onClick={handleCreateTask}>Create</Button>

                </CardActions>
                <Typography>{listData.ListName}</Typography>
                <CardContent>
                    <List>
                        {taskData.Task?.map(task => (
                            <ViewTask key={task.ID} task={task} onDeleteTask={handleDeleteTask} />
                        ))}

                    </List>
                </CardContent>

            </Card>
        </Container>
    )
}
