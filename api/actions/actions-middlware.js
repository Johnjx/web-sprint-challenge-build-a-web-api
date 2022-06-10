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

const validateActionPost = (req, res, next) => {
    let { notes, description, completed, project_id } = req.body;
    if (!notes || typeof notes !== 'string' || notes.trim() === '') {
        next({
            message: 'Must provide valid notes and description.',
            status: 400
        });
        return;
    } 
    if (!description 
        || typeof description !== 'string' 
        || description.trim() === ''
        || description.trim().length > 128) {
        next({
            message: 'Must provide valid name and description. Description max character length is 128.',
            status: 400
        });
        return;
    }
    if (project_id === null || typeof project_id !== 'number') {
        next({
            message: 'Project ID must be set as a number',
            status: 400
        });
        return;
    }
    if (typeof completed !== 'undefined' && typeof completed === 'boolean') {
        notes = notes.trim();
        description = description.trim();
        req.body = { notes, description, project_id, completed };
        next();
        return;
    }
    if (typeof completed === 'undefined') {
        actionsModel.get()
        .then(actionsArr => {
            const checkExist = actionsArr.find(action => action.project_id === project_id);
            if (checkExist) {
                notes = notes.trim();
                description = description.trim();
                req.body = { notes, description, project_id };
                next();  
            }
            if (!checkExist) {
                next({
                    message: 'Project ID does not exist.',
                    status: 404
                });
                return; 
            }
        })
        .catch(next)
    }
}

module.exports = {
    validateActionId,
    validateActionPost
}