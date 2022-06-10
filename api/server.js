const express = require('express');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Unit 4 - SC1</h1>`);
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
})

module.exports = server;
