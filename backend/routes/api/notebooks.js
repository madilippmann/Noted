const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Notebook, Note } = require('../../db/models');

// Add validation for title later
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// Get all notebooks from user
router.get(
    '/users/:userId(\\d+)/notebooks',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;

        const notebooks = await Notebook.findAll({
            where: { userId },
            order: [["updatedAt", "DESC"]]
        });

        return res.json({ notebooks })
    })
);


// Create new notebook
router.post(
    '/users/:userId(\\d+)/notebooks',
    asyncHandler(async (req, res) => {
        const { userId } = req.body;

        const notebook = await Notebook.create({ userId });

        return res.json({ notebook });
    }),
);


// Update existing notebook
router.patch(
    '/users/:userId(\\d+)/notebooks/:notebookId(\\d+)',
    asyncHandler(async (req, res) => {
        const { notebookId, userId } = req.params;
        const { title, updatedAt } = req.body;

        console.log('ENTERED');
        const notebook = await Notebook.findOne({
            where: {
                id: notebookId,
                userId
            }
        });



        // await notebook.update({
        //     title,
        //     updatedAt: new Date()
        // })

        if (title) {
            notebook.title = `Termporary title reassignment for updatedAt to work`;
            await notebook.save();
            notebook.title = title;
            await notebook.save();
        }


        return res.json({ notebook });
    }),
);

// Delete existing notebook
router.delete(
    '/users/:userId(\\d+)/notebooks/:notebookId(\\d+)',
    asyncHandler(async (req, res) => {
        const { id } = req.body;
        const { userId } = req.params;

        const notebook = await Notebook.findOne({
            where: {
                id,
                userId
            }
        });


        const notes = await Note.findAll({
            where: {
                userId,
                notebookId: id
            }
        })

        if (notes.length > 0) {
            notes.forEach(async note => {
                await note.update({ notebookId: null })
            })

        }

        await notebook.destroy();

        return res.json({ notebook });
    }),
);


module.exports = router;
