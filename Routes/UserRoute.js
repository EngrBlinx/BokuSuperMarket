const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

//define routes
router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);

//export the routes
module.exports = router;
