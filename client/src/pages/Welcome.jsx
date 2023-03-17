import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import createList from '../functions/WelcomePage/createList.js'
import ViewList from '../components/list/ViewList.jsx'
const { data } = require('../data/listExampleData.js')

export default function Welcome() {

    //TODO: replace with fetch request-->this is to imitate a fetch request using the userID from the cookie when logging in.
    const [userData, setUserData] = React.useState(data[0])
    const [listName, setListName] = React.useState('')
    function handleCreateList() {
        // we can try to update the state here.
        createList(listName)
        console.log(data[0])
        // userData.List.map((list) => {
        //     console.log(list)
        // })

    }

    return (
        <Container>
            <Typography>Welcome</Typography>
            <Box>
                <TextField onChange={(e) => {
                    setListName(e.target.value)
                }} />
                <Button variant="contained" onClick={handleCreateList}>Create List</Button>
            </Box>
            <Box>
                {userData.List.map((list) => (
                    <ViewList key={list.ID} list={list} />
                )

                )}
            </Box>


        </Container>

    )
}
