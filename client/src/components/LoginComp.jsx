import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";

function LoginComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusText, setStatusText] = useState('');
    const handleLogin = async () => {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password },
            ),
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            //redirect to home page
            window.location.href = '/home';
            setStatusText('Logged in');

        } else {
            setStatusText(data.message);
        }
    }
    return (
        <div>
            <Container>
                <Typography variant="h2" gutterBottom={true} sx={{ marginTop: 5 }}>Login</Typography>
                <TextField required label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button id="login" variant="contained" size="large" onClick={handleLogin} sx={{ marginTop: 1, marginLeft: 1 }} >Login</Button>
                <Button id="register" variant="contained" size="large" href="/register" sx={{ marginTop: 1, marginLeft: 1 }} >Register</Button>
                {statusText && <p>{statusText}</p>}
            </Container>
        </div>
    );

}
export default LoginComp;