
const express = require('express');
const userController = require('../controllers/user');

/**
*  @swagger
*  components:
*    schemas:
*      User:
*        type: object
*        required:
*          - id
*          - name
*          - email
*        properties:
*          id:
*            type: integer
*          name:
*            type: string
*          email:
*            type: string
*        example:
*          name: test
*          email: email
*/


const router = express.Router();
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 */
router.get('/:id', userController.getUser);

router.get('/', userController.getAllUser);

router.post('/create', userController.createUser);

module.exports = router;