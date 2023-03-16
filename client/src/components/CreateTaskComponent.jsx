import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TaskComponent from './TaskComponent';

export default function CreateTaskComponent({ list }) {
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]); //list of lists

    //for every list i will create a new task component by passing in the list id
    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch(`http://localhost:3001/task/${list.ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();
            // if we get a 200 response, we know we have a valid user
            if (response.status === 200) {
                setTasks(data);


            }
            else
                console.log(console.error());


        }
        fetchTasks();
    }, []);

    function handleCreateTask() {
        console.log("i am so tired, but this button should create a task with the id of: ", taskText, list.ID);
        fetch(`http://localhost:3001/task`, {
            method: 'POST',
            body: JSON.stringify({ Text: taskText, ListID: list.ID }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
            .then((response) => {
                const data = response.json();
                if (response.status === 200) {
                    console.log("created task");
                    //TODO: find a better way to refresh the page 
                    window.location.reload();
                }
                else
                    console.log(console.error());
                return data;
            }).then((data) => {
                console.log(data);
            }
            )
    }
    function handleDeleteList() {
        console.log("i am so tired, but this button should delete an list with the id of: ", list.ID);
        fetch(`http://localhost:3001/list`, {
            method: 'DELETE',
            body: JSON.stringify({ ID: list.ID }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("deleted list");
                    //TODO: find a better way to refresh the page 
                    window.location.reload();
                }
                else
                    console.log(console.error());
            }
            )
    }
    return (
        <div key={list.ID} >
            <h2 >{list.ListName}</h2>
            <TextField type="text" value={taskText} onChange={(e) => {
                setTaskText(e.target.value)
            }} />
            <Button variant="contained" onClick={handleCreateTask}>Create Task</Button>
            <Button variant="contained" onClick={handleDeleteList}>Delete List</Button>
            {tasks.map((task) => {
                return <TaskComponent key={task.ID} task={task} />
            })}
        </div>
    )
}
