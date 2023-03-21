import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";


function RegisterComp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusText, setStatusText] = useState('');

    const handleRegister = async () => {
        const response = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, name, email }
            ),
            Credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            window.location.href = '/login';
            setStatusText('Account created!');
        } else {
            setStatusText(data.message);
        }
    }
    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <TextField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField required label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField required label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item >
                    <Button style={{ margin: 2 }} id="register" variant="contained" onClick={handleRegister} >Register</Button>
                    <Button style={{ margin: 2 }} id="login" variant="contained" href="/login" >Login</Button>
                    {statusText && <p>{statusText}</p>}
                </Grid>
            </Grid>

        </Container>
    );
}
export default RegisterComp;