const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class ProjectValidator {
    validateProjectData = () => {
        return [
            body('name').notEmpty().isString().withMessage('The project name is mandatory'),
            body('description').isString().withMessage('Provide a description for the project'),
            body('startDate').isISO8601().withMessage('Provide a valid start date in ISO format'),
            body('endDate').optional().isISO8601().withMessage('Provide a valid end date in ISO format'),
            body('status').isString().withMessage('Provide a status for the project'),
            body('status').custom((value) => {
                const validStatuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];
                if (!validStatuses.includes(value)) {
                    throw new Error(`Status must be one of the following: ${validStatuses.join(', ')}`);
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };

    validateProjectDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };

    validateProjectId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid project ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateProjectUpdateDataById = () => {
        return [
            body('name').notEmpty().isString().withMessage('The project name is mandatory'),
            body('description').isString().withMessage('Provide a description for the project'),
            body('startDate').isISO8601().withMessage('Provide a valid start date in ISO format'),
            body('endDate').optional().isISO8601().withMessage('Provide a valid end date in ISO format'),
            body('status').isString().withMessage('Provide a status for the project'),
            body('status').custom((value) => {
                const validStatuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];
                if (!validStatuses.includes(value)) {
                    throw new Error(`Status must be one of the following: ${validStatuses.join(', ')}`);
                }
                return true;
            }),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid project ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };
}

module.exports = ProjectValidator;