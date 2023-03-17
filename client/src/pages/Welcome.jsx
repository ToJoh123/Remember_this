import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import createList from '../functions/WelcomePage/createList.js'
import deleteList from '../functions/WelcomePage/deleteList.js'
import ViewList from '../components/list/ViewList.jsx'
const { data } = require('../data/listExampleData.js')

export default function Welcome() {

    //TODO: replace with fetch request-->this is to imitate a fetch request using the userID from the cookie when logging in.
    const [userData, setUserData] = useState([])
    const [listName, setListName] = useState('')

    useEffect(() => {
        function fetchData() {
            setUserData(data[0])

        }

        return () => {
            fetchData();
        }
    }, [])
    function getUserData() {
        console.log(userData.List[0].Task[0])
    }
    function handleCreateList() {

        const newID = userData.List.length + 1
        const newListName = listName
        const newList = {
            ID: newID,
            ListName: newListName,
            Task: []
        }
        setUserData(userData => ({
            ...userData,
            List: [
                ...userData.List,
                newList
            ]
        }))
        createList(newList)
    }
    function handleDeleteList(listID) {
        //TODO:It deletes from state but not from the database

        //this functions copies the ...userData except for the list that has the same ID as the listID
        setUserData(userData => ({
            ...userData,
            List: userData.List.filter(list => list.ID !== listID)
        }))
        deleteList(listID)
    }


    return (
        <Container>
            <Typography>Welcome</Typography>
            <Box>
                <TextField onChange={(e) => {
                    setListName(e.target.value)
                }} />
                <Button variant="contained" onClick={handleCreateList}>Create List</Button>
                <Button variant="contained" onClick={getUserData}>Get Data</Button>
            </Box>
            <Box>
                {userData.List?.map((list) => (
                    <ViewList key={list.ID} list={list} onDelete={handleDeleteList} />
                )
                )}
            </Box>


        </Container>

    )
}
