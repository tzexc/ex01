const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
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
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    rtsp_urls : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rtsp'
    }
    ]
}, { versionKey: false,  timestamps: true  }));

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(2).max(255).required()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;