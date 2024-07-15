const express = require('express');
const router = express.Router();

const usersController = require('../controllers/Users');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post('/', isAuthenticated, usersController.createUser);
router.put('/:id', isAuthenticated, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
    