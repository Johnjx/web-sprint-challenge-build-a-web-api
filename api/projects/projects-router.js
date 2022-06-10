const express = require('express');
const router = express.Router();
const projectsModel = require('./projects-model');
const { validateProjectId,
        validateProjectPost,
        validateProjectUpdate } = require('./projects-middleware');

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

router.delete('/:id', validateProjectId, (req, res, next) => {
    projectsModel.remove(req.params.id)
    .then(deleteCount => {
        if (!deleteCount) {
            next({
                message: 'Project could not be deleted at this time.'
            });
            return;
        }
        res.status(200).end();
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProjectUpdate, (req, res, next) => {
    projectsModel.update(req.params.id, req.body)
    .then(updatedProject => res.json(updatedProject))
    .catch(next);
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    projectsModel.getProjectActions(req.params.id)
    .then(actionsArr => res.json(actionsArr))
    .catch(next);
})

module.exports = router;