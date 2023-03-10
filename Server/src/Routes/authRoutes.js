const express = require('express');
const { login } = require('../Controllers/authControllers/login');
const { register } = require('../Controllers/authControllers/register');

const authRoutes = express.Router();
authRoutes.post('/login',login)
authRoutes.post('/register',register)
exports.authRoutes = authRoutes;