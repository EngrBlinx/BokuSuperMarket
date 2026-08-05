const express = require('express');
const router = express.Router(); // express.Router() is a special Express feature used to define routes in a separate file

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', productController.createProduct);

router.put('/updateproduct/:id', productController.updateProduct);

//exprort the router to be used in other files
module.exports = router;
