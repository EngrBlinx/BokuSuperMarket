const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Create a user
exports.createUser = async (req, res) => {
    try{
        //request body
        const {name, email, password, gender, phone, role, hasAdminAccess} = req.body;

        //check required fields
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.gender || !req.body.phone)
            return res.status(400).json({message: 'Please provide all required fields'});
        
        //check if email already exists
        const existingEmail = await User.findOne({email: req.body.email});
        if(existingEmail)
            return res.status(400).json({message: 'Email already exists'});

        //phone check
        const existingPhone = await User.findOne({phone: req.body.phone});
        if(existingPhone)
            return res.status(400).json({message: 'Phone number already exists'});

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role || 'user', //user is the default value
            hasAdminAccess: req.body.hasAdminAccess || false
        });

        await user.save();
        res.status(201).json({message: 'User saved successfully', user});
    }catch(error){
        res.status(500).json({message: 'error creating user', error: error.message});
    }
};

//Login user
exports.loginUser = async (req, res) =>{
    try{
        const { email, password } = req.body;

        //check required fields
        if(!email || !password)
            return res.status(400).json({ message: 'Provide all required fields' });

        //check if user exists
        const existingUser = await User.findOne({ email }); //findOne() returns the user object or null if not found
        if(!existingUser)
            return res.status(404).json({ message: 'User not found' });

        //Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid)
            return res.status(401).json({ message: 'Your username and password did not match' });

        //generate a token
        const token = await jwt.sign({ id: existingUser._id, email: existingUser.email, name: existingUser.name, role: existingUser.role, hasAdminAccess: existingUser.hasAdminAccess }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Login Successful!!!', token });
    }catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};