const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const noteController = require('./controller');

/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: q
 *         description: Search note using note title.
 *         schema:
 *           type: query
 *       - in: path
 *         name: tags
 *         description: Search note using note tags (you can use multiple tag).
 *         schema:
 *           type: array
 *     summary: Retreive list notes
 *     responses:
 *       200:
 *         description: Success return if get list note
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.get('/notes', noteController.index);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: text
 *                 description: Note title
 *                 Example: Mabar DoTA 2
 *               description:
 *                 type: text
 *                 description: Note description
 *                 Example: Mabar DoTA 2 bareng temen temen kantor yang berendingkan loss streak.
 *               image_url:
 *                 type: file
 *                 description: Note image
 *               tags:
 *                 type: text
 *                 description: Note tags (you can input multiple tags [array])
 *     summary: Create new note
 *     responses:
 *       200:
 *         description: Note created!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.post('/notes', multer({ dest: os.tmpdir() }).single('image'), noteController.store);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: text
 *                 description: Note title
 *                 Example: Mabar DoTA 2
 *               description:
 *                 type: text
 *                 description: Note description
 *                 Example: Mabar DoTA 2 bareng temen temen kantor yang berendingkan loss streak.
 *               image_url:
 *                 type: file
 *                 description: Note image
 *               tags:
 *                 type: text
 *                 description: Note tags (you can input multiple tags [array])
 *     summary: Update a note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note Id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note updated!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.put('/notes/:id', multer({ dest: os.tmpdir() }).single('image'), noteController.update);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     tags: [Notes]
 *     summary: Delete a note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note Id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.delete('/notes/:id', noteController.destroy);

module.exports = router;