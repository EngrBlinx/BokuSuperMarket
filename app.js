const express = require('express'); //imports the Express framework
const app = express(); //creates an Express application object.

const dotenv = require('dotenv'); //This imports the dotenv package.
dotenv.config(); // Load environment variables from .env file and make them available in process.env

app.use(express.json()); //middleware to serialize JSON request bodies

const productRoute = require('./Routes/ProductRoute'); //This imports the route file for products.
app.use('/products', productRoute); //use the product route for all requests starting with /products

const userRoute = require('./Routes/UserRoute');
app.use('/users', userRoute);

const connectDB = require('./Config/databaseConfig'); //This imports the database connection function from the config folder.
connectDB(); // This runs the database connection function and connects to MongoDB

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});