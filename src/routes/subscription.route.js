const express = require('express')
const router = express.Router()
const subscriptionController =   require('../controllers/subscription.controller');
// Retrieve all plans for a user by userName
router.get('/subscription/:userName/', subscriptionController.findAllPlansByUserName);
// Retrieve all plans for a user by userName and Date
router.get('/subscription/:userName/:date', subscriptionController.findAllPlansByUserNameandDate);
// Create a new Subscription
router.post('/subscription', subscriptionController.create);
// // Retrieve a single employee with id
// router.get('/:userName', userController.findByUserName);

module.exports = router