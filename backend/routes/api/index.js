const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes.js');
const notebooksRouter = require('./notebooks.js');
const tagsRouter = require('./tags.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use(notesRouter);
router.use(notebooksRouter);
router.use(tagsRouter);


router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


// ROTUES FOR TESTING AUTH FUNCTIONALITY
// GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {

//     const user = await User.findOne({
//         where: {
//             email: 'demo@user.io'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });

// }));

// router.get(
//     '/restore-user',
//     restoreUser,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );



module.exports = router;
