const express = require('express');
const { auth } = require('../Controllers/authControllers/auth');
const { login } = require('../Controllers/authControllers/login');
const { register } = require('../Controllers/authControllers/register');

const authRoutes = express.Router();
authRoutes.get('/',auth)
authRoutes.post('/login',login)
authRoutes.post('/register',register)
exports.authRoutes = authRoutes;