const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require ('dotenv').config();

server.use(cookieParser());
server.use(express.json());
server.use(cors());


const {listRoutes} = require('./Routes/listRoutes');
server.use('/list',listRoutes);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  }
)