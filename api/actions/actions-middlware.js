const actionsModel = require('./actions-model');

const validateActionId = (req, res, next) => {
    actionsModel.get(req.params.id)
    .then(result => {
        if (result == null) {
            next({
                message: 'Action not found.',
                status: 404
            });
            return;
        }
        req.action = result;
        next();
    })
    .catch(next)
}

module.exports = {
    validateActionId
};
