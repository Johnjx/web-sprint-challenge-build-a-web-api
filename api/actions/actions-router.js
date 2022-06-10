const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');
const { validateActionId,
        validateActionPost } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    actionsModel.get()
    .then(actionsArr => res.json(actionsArr))
    .catch(next);
 })

 router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
})

router.post('/', validateActionPost, (req, res, next) => {
    actionsModel.insert(req.body)
    .then(newAction => res.status(201).json(newAction))
    .catch(next);
})

router.delete('/:id', validateActionId, (req, res, next) => {
    actionsModel.remove(req.params.id)
    .then(deleteCount => {
        if (!deleteCount) {
            next({
                message: 'Action could not be deleted at this time.'
            });
            return;
        }
        res.status(200).end();
    })
    .catch(next)
})

module.exports = router;
