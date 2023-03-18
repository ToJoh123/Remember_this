import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import createList from '../functions/WelcomePage/createList.js'
import deleteList from '../functions/WelcomePage/deleteList.js'
import ViewList from '../components/list/ViewList.jsx'
const { getUserMockServer, addListMockServer, deleteListMockServer } = require('../data/mockServer.js')
const userID = 1

export default function Welcome() {

    //TODO: replace with fetch request-->this is to imitate a fetch request using the userID from the cookie when logging in.
    const [userData, setUserData] = useState([])
    const [listName, setListName] = useState('')

    useEffect(() => {
        function fetchData() {

            try {
                setUserData(getUserMockServer(userID))

            } catch (error) {
                console.log(error)
            }
        }
        return () => {
            fetchData();
        }
    }, [])
    function getUserData() {
        setUserData(getUserMockServer(userID))
        console.log(userData)
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
        addListMockServer(userID, listName) //mockServer function
        createList(newList)
    }
    function handleDeleteList(listID) {
        //TODO:It deletes from state but not from the database

        //this functions copies the ...userData except for the list that has the same ID as the listID
        // setUserData(userData => ({
        //     ...userData,
        //     List: userData.List.filter(list => list.ID !== listID)
        // }))
        deleteListMockServer(userID, listID) //mockServer function
        getUserData()
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
                {userData.List?.map((listData) => (
                    <ViewList key={listData.ID} listData={listData} onDeleteList={handleDeleteList} />
                )
                )}
            </Box>
        </Container>

    )
}
