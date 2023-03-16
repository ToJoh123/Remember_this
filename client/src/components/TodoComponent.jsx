import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateListItemComponent from './CreateListItemComponent'
import CreateTaskComponent from './CreateTaskComponent'

export default function TodoComponent() {
    const [lists, setLists] = useState([]); //list of lists
    //for every list i will create a new task component by passing in the list id
    useEffect(() => {
        async function fetchLists() {
            const response = await fetch('http://localhost:3001/list/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setLists(data);
        }
        fetchLists();
    }, []);
    return (

        //renders createListItemComponent and if there is no list it will render nothing
        <Container>
            <CreateListItemComponent />
            {Array.isArray(lists) && lists.length > 0 ? (
                lists.map((list) => (
                    <CreateTaskComponent key={list.ID} list={list} />
                ))
            ) : null}
        </Container>
    );

}
