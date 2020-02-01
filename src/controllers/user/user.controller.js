const { User,validate } = require('../../models/user');
const userService = require('../../services/user.service')

module.exports = {
    rtspByUser : async (req, res) => {
        try{
            const { user_id } = req.body;
            const user = await userService.getRtspByUser(user_id);
            res.send(user.rtsp_urls);
        }
        catch(e){
           return res.status(400).send('Error occured');
       }
    },
    create : async (req, res) =>{
        try{
            const { error } = validate(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            // Check if user already exist
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                console.log('user already exists');
                return res.status(400).send('user already exists');
            } else {
                const userDTO = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
    
                const userResult = await userService.register(userDTO);
                
                res.send({
                    id: userResult._id,
                    email: userResult.email,
                    name: userResult.name
                });
            }
        }
        catch(e){
            console.log(e.message)
            return res.status(400).send('Error occured');
        }
    }
}