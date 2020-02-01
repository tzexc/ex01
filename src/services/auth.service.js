const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

class AuthService{
    constructor(){}

    async isPassowrdValid(bodyPass, userPass){
        const validPassword = await bcrypt.compare(bodyPass, userPass);
       
        if (!validPassword) {
            throw new Error('invalid password match')
        }
        
        return true;
    }

    createToken(user){
       delete user.password;
       
       return jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, config.get('token_secret_key'),{ expiresIn: '1d' });
    }

    async verify(token){
        return jwt.verify(token, config.get('token_secret_key'));
    }
}

module.exports = new AuthService();