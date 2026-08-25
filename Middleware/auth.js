const jwt = require('jsonwebtoken');

//Middleware to verify the token

exports.protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];//split() runs if auth token is present
    if(!token)
        return res.status(401).json({ message: 'Not authorized, no token'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//convert the token into the user object with only the fields included in the token signature and pass to the next middleware or controller
        req.user = decoded;//To clarify or identify the use performing the action
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed'});
    }
};