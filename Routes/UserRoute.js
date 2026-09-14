const express = require('express');
//import router
const router = express.Router();

//Import middlewares
const { protect } = require('../Middleware/auth');
const { authorize } = require('../Middleware/role');


const userController = require('../Controllers/UserController');

//define routes
router.post('/createuser', protect, authorize('superAdmin'), userController.createUser);
router.post('/loginuser', userController.loginUser);

//export the routes
module.exports = router;
