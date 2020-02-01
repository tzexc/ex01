const Joi = require('joi');
const userService = require('../../services/user.service')
const authService = require('../../services/auth.service')

module.exports = {
    create : async (req, res) =>{
        try{
            const { error } = validate(req.body);
            
            if (error) {
                throw new Error(error.details[0].message);
            }
    
            const user = await userService.findOne(req.body.email);
            if (!user) {
                throw new Error(`Could not find any User with the email : ${req.body.email}`)
            } 
            await authService.isPassowrdValid(req.body.password , user.password);
            const token = authService.createToken(user);
            res.send({token});
        }
        catch(e){
            console.error(e.message);
            return res.status(401).send('Unauthorized');
        }
    }
}

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(2).max(255).required()
    };
 
    return Joi.validate(req, schema);
}