import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //user gets authenticated from server and set states to loading after await and authenticated after await
    //if user is authenticated, set isAuthenticated to true
    //if user is not authenticated, set isAuthenticated to false
    //if user is not authenticated, navigate to login page
    //we check auth localhost:3001/auth, with credentials: 'include'
    //if user is authenticated, we get a response with a status of 200
    //if user is not authenticated, we get a response with a status of 401
    //if user is not authenticated, we navigate to login page

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://localhost:3001/auth', {
                credentials: 'include'
            })
            if (response.status === 200) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])


    return (
        //if loading show loading
        //if not loading and authenticated show outlet
        //if not loading and not authenticated show navigate
        <>
            {isLoading ? <div>Loading...</div> : isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        </>


    )
}

export default PrivateRoutes