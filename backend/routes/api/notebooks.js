const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Notebook } = require('../../db/models');

// Add validation for title later
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// Get all posts from user
router.get(
    '/users/:userId(\\d+)/notebooks',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;

        const notes = await Note.findAll({
            where: { userId },
            order: [["id", "DESC"]]
        });

        return res.json({ notes })
    })
);


// Create new note
router.post(
    '/users/:userId(\\d+)/notebookss',
    asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const note = await Note.create({ title: 'Untitled', content: '', userId });

        return res.json({ note });
    }),
);


// Update existing note
router.patch(
    '/users/:userId(\\d+)/notebooks/:notebookId(\\d+)',
    asyncHandler(async (req, res) => {
        const { noteId, userId } = req.params
        const { title, content, notebookId } = req.body;

        const note = await Note.findOne({
            where: {
                id: noteId,
                userId
            }
        });

        if (title) note.title = title;
        if (content) note.content = content;
        if (notebookId) note.notebookId = notebookId;

        await note.save()

        return res.json({ note });
    }),
);

// Delete existing note
router.delete(
    '/users/:userId(\\d+)/notebooks/:notebookId(\\d+)',
    asyncHandler(async (req, res) => {
        const { noteId } = req.body;
        const { userId } = req.params;

        const note = await Note.findOne({
            where: {
                id: noteId,
                userId
            }
        });

        await note.destroy();

        return res.json({ note });
    }),
);


module.exports = router;
