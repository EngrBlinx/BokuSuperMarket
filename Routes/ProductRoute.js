const express = require('express');
const router = express.Router(); // express.Router() is a special Express feature used to define routes in a separate file

//Import the token decoder middleware
const { protect } = require('../Middleware/auth');

//Import the authorization middleware
const { authorize } = require('../Middleware/role');

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', protect, authorize('superAdmin', 'storeKeeper'), productController.createProductWithImage);

router.put('/updateproduct/:id', protect, authorize('superAdmin', 'storeKeeper'), productController.updateProduct);

router.get('/getproduct/:id', protect, productController.getProductById);

router.get('/getproducts', protect, productController.getAllProducts);

//exprort the router to be used in other files
module.exports = router;
