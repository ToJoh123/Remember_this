import { AppBar, Button, Grid, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderComp() {
    function handleLogout() {
        // delete cookie
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // redirect to login page
        window.location.href = "/login";
    }
    return (
        <div>
            <Grid container spacing={4} alignItems="center">
                <Grid item >
                    <h1>Remember this</h1>
                </Grid>
                <Grid item>
                    <NavLink to="/"><Button>Start</Button>
                    </NavLink>
                    <NavLink to="/home">
                        <Button>Home</Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button>Register</Button>
                    </NavLink>
                    <Button onClick={handleLogout}>Login</Button>
                </Grid>
                <Grid item xs>
                    <Button>Logout</Button>
                </Grid>
            </Grid>
        </div>
    )
}
