const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.post('/test', function (req, res) {
    res.send('route exists')
    res.json({ requestBody: req.body });
});



// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {

    const user = await User.findOne({
        where: {
            email: 'demo@user.io'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });

}));

router.get(
    '/restore-user',
    restoreUser,
    (req, res) => {
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);



module.exports = router;
