const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then(
                (user) => {
                    if (user) {
                        return Promise.reject(
                            "The provided email is already in use"
                        );
                    }
                }
            );
        }),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a first name with at least 1 character.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email.'),
    check('firstName')
        .matches(/^[.\S].*$/)
        .withMessage('Invalid first name value'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a last name with at least 1 character.'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last name cannot be an email.'),
    check('lastName')
        .matches(/^[.\S].*$/)
        .withMessage('Invalid last name value'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, firstName, lastName, password } = req.body;
        const user = await User.signup({ email, firstName, lastName, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);








module.exports = router;
