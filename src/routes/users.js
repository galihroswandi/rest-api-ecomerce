const express = require('express');

const userController = require('./../controller/users');

const router = express.Router();

// CREATE - POST
router.post('/', userController.createNewUser);

// READ - GET
router.get('/', userController.getAllUsers);

// UPDATE - PATCH
router.patch('/:id_user', userController.updateUser);

// DELETE - DELETE
router.delete('/:id_user', userController.deleteUser);

module.exports = router;