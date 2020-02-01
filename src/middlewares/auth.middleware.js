const userService = require('../services/user.service')
const authService = require('../services/auth.service')

module.exports = async (req, res, next) => {
    try{
        if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            throw new Error('Invalid header');
        }

        const token = req.headers.authorization.split(' ')[1];
        const user = await authService.verify(token);
        const isUser = await userService.findOne(user.email);
       
        if(!isUser){
            throw new Error("unautherized user");
        }

        return next();
    }
    catch(e){
        console.error(e.message);
        return res.status(401).json({ error: 'Unautherzied' });
    }

  };