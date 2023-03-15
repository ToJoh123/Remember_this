import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
            setStatusText('Logged in');
        } else {
            setStatusText(data.message);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <React.Fragment>
                <TextField required label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button id="login" variant="contained" onClick={handleLogin} >Login</Button>
                {statusText && <p>{statusText}</p>}
            </React.Fragment>
        </div>
    );


}
export default LoginComp;