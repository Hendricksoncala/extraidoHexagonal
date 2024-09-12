const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs")

class UserValidator {

    validateUserLogin = () => {
        return [
            body('nick').notEmpty().isString().withMessage('The Nickname is mandatory'),
            body('password').notEmpty().isLength({min: 8}).isString().withMessage('Ur password gotta be > 8'),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ]
    }
    validateUserData = () => {
        return [
            body('cedula').notEmpty().isNumeric().withMessage('The ID is mandatory'),
            body('names').notEmpty().isString().withMessage('El nombre es obligatorio'),
            body('surnames').notEmpty().isString().withMessage('Los surnames deben ser obligatorios'),
            body('nick').notEmpty().isString().withMessage('El nick es obligatorio'),
            body('email').notEmpty().isEmail().withMessage('El email es obligatorio'),
            body('phone').notEmpty().isString().withMessage('El telefono es obligatorio'),
            body('password').notEmpty().isLength({min: 8}).isString().withMessage('Ur password gotta be > 8').custom(async(value, {req}) => {
                req.body.passwordHash = await bcrypt.hash(value, 10);
                return true
            }),
            body("role", "The role was not sent").notEmpty().exists().custom((value) => {
                if (value && !["Usuario Estandar", "Usuario VIP", "Administrador"].includes(value)) {
                    throw new Error('There are only three roles available "UsuarioEstandar", "Usuario VIP", "Administrador"')
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
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

    validateUserUpdateDataById = () => {
        return [   
            body('nombre').notEmpty().isNumeric().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            body('en_stock').notEmpty().isBoolean().withMessage('El Stock debe ser booleano'),
            body('categoria').notEmpty().isString().withMessage('La categoria es obligatoria'),
            body('descuento').isNumeric().withMessage('El descuento, no es obligatorio'),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = UserValidator;