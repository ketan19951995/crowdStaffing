const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
// Create a new user
router.put('/:userName', userController.create);
// Retrieve a single user with username
router.get('/:userName', userController.findByUserName);

module.exports = router