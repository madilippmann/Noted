const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


// Sign up
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        const user = await User.signup({ firstName, lastName, email, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);

module.exports = router;
