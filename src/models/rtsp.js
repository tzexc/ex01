const Joi = require('joi');
const mongoose = require('mongoose');
 
const Rtsp = mongoose.model('Rtsp', new mongoose.Schema({
    url:{
        type:String,
        required: '{PATH} is required!'
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { versionKey: false, timestamps:true }));

function validateRtsp(rtsp) {
    const schema = {
        url: Joi.string().required(),
        user_id: Joi.string().required()
    };
    return Joi.validate(rtsp, schema);
}
 
exports.Rtsp = Rtsp;
exports.validate = validateRtsp;