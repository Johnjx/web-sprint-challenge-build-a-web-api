const express = require('express');
const router = express.Router();
const projectsModel = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

router.get('/', (req, res, next) => {
   projectsModel.get()
   .then(projectsArr => res.json(projectsArr))
   .catch(next);
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
})

module.exports = router;