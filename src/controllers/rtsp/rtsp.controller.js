const { validate } = require('../../models/rtsp');
const rtsService = require('../../services/rtsp.service')
const rtspSocketService = require('../../services/rtsp-socket.service')
const usersService = require('../../services/user.service')

module.exports = {
    startSocket: async(req,res) =>{
        const io = req.app.get('socketio');
        const rtsps =  await usersService.getRtspByUser(req.body.user_id);

        rtspSocketService.inititlizeCams(rtsps.rtsp_urls,io);
        rtspSocketService.startSocket(io);
        res.send(true);
    },
    create : async (req, res) =>{
        try{
            const { error } = validate(req.body);
           
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
    
            const rtspDto = {
                url: req.body.url,
                user: req.body.user_id
            }
    
            const rtsp = await rtsService.add(rtspDto);
            await usersService.addRtspUrl(rtspDto.user, rtsp)
    
            res.send(true);
        }
        catch(e){
            console.error(e.message)
            return res.status(400).send('Error occured');
        }
    }
}