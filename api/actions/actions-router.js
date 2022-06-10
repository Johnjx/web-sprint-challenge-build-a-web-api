const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');
const { validateActionId } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    actionsModel.get()
    .then(actionsArr => res.json(actionsArr))
    .catch(next);
 })

 router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
})

module.exports = router;
