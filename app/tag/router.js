const router = require('express').Router();
const multer = require('multer');

const tagController = require('./controller');

/**
 * @swagger
 * /api/tags:
 *   get:
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: q
 *         description: Search note using note title.
 *         schema:
 *           type: query
 *     summary: Retreive list tags
 *     responses:
 *       200:
 *         description: Success return if get list note
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.get('/tags', tagController.index);

/**
 * @swagger
 * /api/tags:
 *   post:
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: text
 *                 description: Tag name
 *                 Example: Bermain
 *     summary: Create new tag
 *     responses:
 *       200:
 *         description: Create tag succeed!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.post('/tags', multer().none(), tagController.store);

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: text
 *                 description: Tag name
 *                 Example: Bermain
 *     summary: Update a tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag Id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag name updated!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.put('/tags/:id', multer().none(), tagController.update);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     tags: [Tags]
 *     summary: Delete a tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag Id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted!
 *       404:
 *         description: Unknown path
 *       500:
 *         description: Internal server error
 */
router.delete('/tags/:id', tagController.destroy);

module.exports = router;