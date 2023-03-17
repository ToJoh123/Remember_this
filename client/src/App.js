import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './auth/PrivateRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import HeaderComp from './components/HeaderComp'

export default function App() {
  return (
    <div>
        <BrowserRouter>
          <HeaderComp />
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
            </Route>
              <Route element={<Welcome/>} path="/" exact/>
              <Route element={<Register/>} path="/register"/>
              <Route element={<Login/>} path="/login"/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
