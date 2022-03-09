const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Note } = require('../../db/models');

// Add validation for title later
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// Get all notes from user
router.get(
    '/users/:userId(\\d+)/notes',
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
    '/users/:userId(\\d+)/notes',
    asyncHandler(async (req, res) => {
        const { userId, notebookId } = req.body;

        const note = await Note.create({ title: 'Untitled', content: '', userId });

        return res.json({ note });
    }),
);


// Update existing note
router.patch(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)',
    asyncHandler(async (req, res) => {
        const { userId } = req.params
        const { title, content, notebookId, noteId } = req.body;

        const note = await Note.findOne({
            where: {
                id: noteId,
                userId
            }
        });

        const updatedTitle = title || note.title;
        const updatedContent = content || note.content;
        const updatedNotebookId = notebookId || null

        await note.update({
            title: updatedTitle,
            content: updatedContent,
            notebookId: updatedNotebookId
        })


        return res.json({ note });
    }),
);

// Delete existing note
router.delete(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)',
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
