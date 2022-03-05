const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Note } = require('../../db/models');

// Add validation for title later
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./session');

// Get all posts from user
router.get(
    '/users/:userId/notes',
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
    '/users/:userId/notes',
    asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const note = await Note.create({ title: 'Untitled', content: '', userId });

        return res.json({ note });
    }),
);

// Get single note
router.get(
    '/users/:userId/notes/:noteId(\\d+)',
    asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const { noteId } = req.params;

        const note = await Note.findByPk(noteId)

        // TODO ADD EXTRA CHECK
        // if (note.userId === userId) return res.json({ note })
        // else return res.json({})

        return res.json({ note })
    })
);

// Update existing note
router.patch(
    '/users/:userId/notes/:noteId(\\d+)',
    asyncHandler(async (req, res) => {
        const { title, content, noteId, notebookId } = req.body;
        const note = await Note.findByPk(noteId);

        if (title) note.title = title;
        if (content) note.content = content;
        if (notebookId) note.notebookId = notebookId;

        await note.save()

        return res.json({ note });
    }),
);

// Delete existing note
router.delete(
    '/users/:userId/notes/:noteId(\\d+)',
    asyncHandler(async (req, res) => {
        const { noteId } = req.body;
        const note = await Note.findByPk(noteId);

        await note.destroy();

        return res.json({ note });
    }),
);


module.exports = router;
