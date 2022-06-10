const projectsModel = require('./projects-model');

const validateProjectId = (req, res, next) => {
    projectsModel.get(req.params.id)
    .then(result => {
        if (result == null) {
            next({
                message: 'User not found.',
                status: 404
            });
            return;
        }
        req.project = result;
        next();
    })
    .catch(next)
}

const validateProjectPost = (req, res, next) => {
    let { name, description, completed } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        next({
            message: 'Must provide name and description.',
            status: 400
        });
        return;
    } if (!description || typeof description !== 'string' || description.trim() === '') {
        next({
            message: 'Must provide name and description.',
            status: 400
        });
        return;
    }
    if (completed) {
        if (typeof completed !== 'boolean') {
            next({
                message: 'If providing completed status, it must be true or false.',
                status: 400
            });
            return;
        } else if (typeof completed === 'boolean') {
            req.body = {
                name: name,
                description: description,
                completed: completed
            }
            next();
            return; 
        }
    }
    req.body = {
        name: name,
        description: description
    }
    next();
}

module.exports = {
    validateProjectId,
    validateProjectPost
}
