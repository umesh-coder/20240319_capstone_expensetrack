// validate.js
const { body, validationResult } = require('express-validator');


module.exports = {

    validateSignup: [
        body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 15 }).withMessage('Name must have more than 3 characters').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
        body('username').notEmpty().withMessage('Username is required').isLength({ min: 5, max: 15 }).withMessage('Username must have more than 5 characters and less tha 15 charcter').matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage('Username must start with an alphabet and can contain letters and numbers'),
        body('email').isEmail().matches(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).isLength({ min: 5, max: 255 }).withMessage('Email must be between 5 and 255 characters').withMessage('Email is not valid'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('userfirstsignupdate').notEmpty().withMessage('First sign-up date is required').isLength({ min: 10, max: 10 }).withMessage('First sign-up date must be in the format YYYY-MM-DD'),
        body('category').notEmpty().withMessage('Category is required').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ],
    validateLogin: [
        body('email').isEmail().matches(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Not a valid e-mail address').isLength({ min: 5, max: 255 }).withMessage('Email must be between 5 and 255 characters'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },

    ],
    validateCreateExpense: [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 3, max: 15 }).withMessage('Name must be between 3 and 15 characters').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
        body('amount')
            .notEmpty().withMessage('Amount is required')
            .isNumeric().withMessage('Amount must be a number')
            .isLength({ min: 1, max: 10 })
            .isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
        body('expense_date')
            .notEmpty().withMessage('Expense date is required')
            .isLength({ min: 10, max: 10 }).withMessage('First sign-up date must be in the format YYYY-MM-DD'),
        body('expense_category')
            .notEmpty().withMessage('Expense category is required')
            .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic')
            .isLength({ min: 1, max: 15 }).withMessage('Expense category must be between 1 and 15 characters'),
        body('payment')
            .notEmpty().withMessage('Payment method is required')
            .isLength({ min: 1, max: 20 }).withMessage('Payment method must be between 1 and 20 characters')
            .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
        body('comment')
            .optional()
            .isLength({ max: 50 }).withMessage('Comment must be less than 50 characters'),
        body('userid')
            .notEmpty().withMessage('User ID is required')
            .isMongoId().withMessage('User ID must be a valid MongoDB ID'),

        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },


    ],
    saveDataValidator: [
        body('username').not().isEmpty().withMessage('Username is required').isLength({ min: 5, max: 15 }).withMessage('Username must have more than 5 characters and less tha 15 charcter').matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage('Username must start with an alphabet and can contain letters and numbers'),
        body('name').not().isEmpty().withMessage('Name is required').isLength({ min: 3, max: 15 }).withMessage('Name must have more than 3 characters').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
        body('firstlogindate').notEmpty().withMessage('First login date is required').isLength({ min: 10, max: 10 }).withMessage('First login-date date must be in the format YYYY-MM-DD'),
        body('lastlogindate').notEmpty().withMessage('last login date is required').isLength({ min: 10, max: 10 }).withMessage('last login-date date must be in the format YYYY-MM-DD'),
        body('expenselogged').isNumeric().withMessage('Expense logged must be a number').isLength({ min: 1, max: 5 }),
        body('userid').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },


    ],
    updatesavedataValidator: [

        body('lastlogindate').notEmpty().withMessage('last login date is required').isLength({ min: 10, max: 10 }).withMessage('last login-date date must be in the format YYYY-MM-DD'),
        body('expenselogged').isNumeric().withMessage('Expense logged must be a number').isLength({ min: 1, max: 5 }).isFloat({ gt: 0 }).withMessage('Expense logged must be greater than zero'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },

    ],
    saveCategoryValidator: [
        // Validate that categories is an array
        body('categories').isArray().withMessage('Categories must be an array'),

        // Validate each element in the categories array as a string
        body('categories.*').isString().withMessage('Each category must be a string').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),

        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },

    ],
    updateProfileValidator : [
        // Validate username
        body('username').notEmpty().withMessage('Username is required').isLength({ min: 5, max: 15 }).withMessage('Username must have more than 5 characters and less tha 15 charcter').matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage('Username must start with an alphabet and can contain letters and numbers'),

        // Validate name
        body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 15 }).withMessage('Name must have more than 3 characters').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),

        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },

            
    ],
}