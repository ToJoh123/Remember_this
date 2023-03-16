import { Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function CreateListItemComponent() {
    const [listName, setListName] = useState('');

    const url = 'http://localhost:3001/list';


    const handleCreateList = (e) => {
        e.preventDefault();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ listName: listName }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {


                console.log(data);
                // TODO: find a better way to refresh the page
                window.location.reload();
            })
            .catch((err) => {
                console.log("error from fetch", err.message);
            });

    };

    return (
        <div>
            <h1>New List</h1>
            <TextField onChange={(e) => {
                setListName(e.target.value)
            }} />
            <Button variant="contained" onClick={handleCreateList}>Create List</Button>
        </div>
    )
}
