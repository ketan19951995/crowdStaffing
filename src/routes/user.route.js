const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
// Retrieve all employees
router.get('/', userController.findAll);
// Create a new employee
router.put('/:userName', userController.create);
// Retrieve a single employee with id
router.get('/:userName', userController.findByUserName);

module.exports = router