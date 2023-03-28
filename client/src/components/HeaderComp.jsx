import { Button, Grid } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderComp() {
    const handleLogout = async () => {
        console.log('logout');
        const response = await fetch('http://localhost:3001/auth/logout', {
            method: 'Get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {
            window.location.href = '/';
        }
        console.log(data.message);
    }
    return (
        <div>
            <Grid container spacing={4} alignItems="center">
                <Grid item >
                    <h1>Remember this</h1>
                </Grid>
                <Grid item>
                    <NavLink to="/"><Button>Welcome</Button>
                    </NavLink>
                    <NavLink to="/home">
                        <Button>Home</Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button>Register</Button>
                    </NavLink>
                    <NavLink to="/login">
                        <Button>Login</Button>
                    </NavLink>
                    <NavLink to="/friends">
                        <Button>Friends</Button>
                    </NavLink>

                </Grid>
                <Grid item xs>
                    <Button onClick={handleLogout}>Logout</Button>
                </Grid>
            </Grid>
        </div>
    )
}
