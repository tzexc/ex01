const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const  { plainToClass } = require("class-transformer");

class UserService{
    constructor(){}

    async findOne(email){
        
       return await User.findOne({ email });
    }

    async register(userDto){
        const user = new User(userDto);
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        return await user.save();
    }
    async addRtspUrl(userId, rtspObj){
        const userToUpdate = await User.findById(userId);
        console.log(userToUpdate)
        userToUpdate.rtsp_urls.push(rtspObj);
        console.log(userToUpdate)
        const user = new User(userToUpdate);
        await user.save();
    }

    async getRtspByUser(userId){
        return await User.findById(userId).populate('rtsp_urls');
    }
}

module.exports = new UserService();