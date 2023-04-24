const express = require('express');
const Server = require('./models/server');

const app = express();

// The server should listen on port 3000.

const server = new Server();

server.listen();