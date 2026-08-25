const { image } = require('../Config/cloudinaryConfig');
const upload = require('../Middleware/upload');
const Product = require('../Models/Products');
const sendEmail = require('../Middleware/Emailsender');
const { findById } = require('../Models/Users');

//create a product without image
// exports.createProduct = async (req, res) => {
//     try {

//         //check if all required fields are provided
//         if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }

//         const { name, size, description, price, quantity, color } = req.body;  

//         const product = new Product({name,size,description,price, quantity, color});    

//         await product.save();
//         res.status(201).json({ message: 'Product created successfully', product });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating product', error: error.message });
//     }       
// };

//Create a product with image
exports.createProductWithImage = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if(err){
            return res.status(400).json({message: 'Error uploading image', error: err.message});
        }

        try{
            //Check if any required field is missing
            if(!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity){
                return res.status(400).json({message: 'Please provide all required fields'})
            }

            const { name, size, description, price, quantity, color } = req.body;

            if(!req.file)
                return res.status(400).json({message: 'Please select image to upload'});

            const product = new Product({
                name,
                size,
                description,
                price,
                quantity,
                color,
                image: req.file.path
            });

            await product.save();

            //Send email to the admin that a new product has been created
            const subject = 'New Product Created';
            const body = `A new product has been created:\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;
            await sendEmail('anyadikennadozie3@gmail.com', subject, body);

            res.status(201).json({message: 'product added successfully', product});
        }catch(error){
            res.status(500).json({message: 'Error adding product', error: error.message});
        }
    });
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; //where id is the product id to be updated
        const { name, size, description, price, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity, color }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   

        res.status(200).json({ message: 'Product updated successfully', product });
    }   
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }

};

//Get Product
exports.getProductById = async (req, res) => {
    try{
        const { id } = req.params;

        const product = await Product.findById(id);

        if(!product)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ product });
    } catch (error){
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

//Get all products
exports.getAllProducts = async (req, res) => {
    try{
        const product = await Product.find();

        if(!product)
            res.status(404).json({ message: 'Products not found' });

        res.status(200).json({ product });
    } catch (error){
        res.status(500).json({ message: 'Error retrieving products', error:error.message });
    }
}