const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require ('dotenv').config();

server.use(cookieParser());
server.use(express.json());
server.use(cors());


const {listRoutes} = require('./Routes/listRoutes');
const {taskRoutes} = require('./Routes/taskRoutes');
server.use('/list',listRoutes);
server.use('/task',taskRoutes);

server.use(function(req, res, next) {
  res.status(404).send('Unable to find the requested resource!');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  }
)