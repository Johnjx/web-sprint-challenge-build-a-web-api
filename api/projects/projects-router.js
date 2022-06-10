const express = require('express');
const router = express.Router();
const projectsModel = require('./projects-model');
const { validateProjectId, validateProjectPost } = require('./projects-middleware');

router.get('/', (req, res, next) => {
   projectsModel.get()
   .then(projectsArr => res.json(projectsArr))
   .catch(next);
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
})

router.post('/', validateProjectPost, (req, res, next) => {
    projectsModel.insert(req.body)
    .then(newProject => res.status(201).json(newProject))
    .catch(next);
})

module.exports = router;