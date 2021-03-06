const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Notebook, Note, Tag } = require('../../db/models');

// Add validation for title later
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// Get tags for single note from user
router.get(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)/tags',
    asyncHandler(async (req, res) => {
        const { userId, noteId } = req.params;

        const tags = await Tag.findAll({
            where: {
                userId,
                noteId
            }
        });

        return res.json({ tags })
    })
);

// Get all tags from user
router.get(
    '/users/:userId(\\d+)/notes/tags',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;

        const tags = await Tag.findAll({
            where: {
                userId,
            }
        });

        return res.json({ tags })
    })
);



// Create new tag
router.post(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)/tags',
    asyncHandler(async (req, res) => {
        const { userId, noteId } = req.params;
        const { name } = req.body;

        const tag = await Tag.create({
            userId,
            noteId,
            name
        });

        return res.json({ tag });
    }),
);


// Update existing notebook
router.patch(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)/tags/:tagId(\\d+)',
    asyncHandler(async (req, res) => {
        const { userId, noteId, tagId } = req.params;
        const { name } = req.body;

        const tag = await Tag.findOne({
            where: {
                id: tagId,
                userId,
                noteId
            }
        });


        if (name) tag.name = name;

        await tag.save()

        return res.json({ tag });
    }),
);

// Delete existing notebook
router.delete(
    '/users/:userId(\\d+)/notes/:noteId(\\d+)/tags/:tagId(\\d+)',
    asyncHandler(async (req, res) => {
        const { id } = req.body;
        const { userId } = req.params;

        const tag = await Tag.findOne({
            where: {
                id,
                userId
            }
        });

        await tag.destroy();

        return res.json({ tag });
    }),
);


module.exports = router;
