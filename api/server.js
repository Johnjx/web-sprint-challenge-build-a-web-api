const express = require('express');
const projectsRouter = require('./projects/projects-router');
const server = express();
server.use(express.json());
server.use('/api/projects', projectsRouter);

// Build your actions router in /api/actions/actions-router.js

server.get('/', (req, res) => {
    res.send(`<h1>Unit 4 - SC1</h1>`);
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
})

module.exports = server;
