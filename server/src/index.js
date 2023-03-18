const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require ('dotenv').config();

server.use(cookieParser());
server.use(express.json());
server.use(cors({ origin: ['http://localhost:5500', 'http://localhost:3000','http://localhost:3002'], credentials: true}));


const {listRoutes} = require('./Routes/listRoutes');
const {taskRoutes} = require('./Routes/taskRoutes');
const { authRoutes} = require('./Routes/authRoutes');
const { tasteCookie } = require('./Middleware/tasteCookie');

server.use('/list',tasteCookie,listRoutes);
server.use('/task',tasteCookie,taskRoutes);
server.use('/auth',authRoutes);



server.use(function(req, res, next) {
  //this code will return what type of request was made
  console.log(req.method, req.url);
  res.status(404).json({message: 'Not Found',method: req.method, url: req.url});
});

server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
  }
)