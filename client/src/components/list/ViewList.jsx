import { Button, Card, CardActions, CardContent, List, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import ViewTask from './ViewTask'
import DeleteIcon from '@mui/icons-material/Delete';


export default function viewList({ list }) {
    return (
        <Container key={list.ID}>
            <Card>
                <CardActions>
                    <DeleteIcon />
                    <TextField />
                    <Button variant="contained">Create</Button>

                </CardActions>
                <Typography>{list.ListName}</Typography>
                <CardContent>
                    <List>
                        {list.Task.map(task => {
                            return (
                                <ViewTask key={task.ID} task={task} />
                            )
                        }
                        )}
                    </List>
                </CardContent>

            </Card>
        </Container>
    )
}
