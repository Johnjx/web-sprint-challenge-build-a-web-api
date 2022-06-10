const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');

router.get('/', (req, res, next) => {
    actionsModel.get()
    .then(actionsArr => res.json(actionsArr))
    .catch(next);
 })

module.exports = router;
