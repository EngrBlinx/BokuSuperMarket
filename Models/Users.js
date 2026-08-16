const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hasAdminAccess: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true  
    },
    role: {
        type: String,
        enum: ['superAdmin', 'storeKeeper', 'salesperson'],
        default: 'user'
    },
        
},
{timestamps: true}
);

//create model from schema
const User = mongose.model('User', userSchema);
module.exports = User;