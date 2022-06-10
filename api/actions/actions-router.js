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

module.exports = router;
