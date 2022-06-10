const projectsModel = require('./projects-model');

const validateProjectId = (req, res, next) => {
    projectsModel.get(req.params.id)
    .then(result => {
        if (result == null) {
            next({
                message: 'User not found.',
                status: 404
            });
        }
        req.project = result;
        next();
    })
    .catch(next)
}

module.exports = {
    validateProjectId
}
