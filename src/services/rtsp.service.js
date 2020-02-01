const { Rtsp } = require('../models/rtsp');

class RtspService{
    constructor(){}

    async add(rtspDto){
        const rtsp = await Rtsp.create({
            url: rtspDto.url,
            user:rtspDto.user
        });

        await rtsp.save();
        return rtsp;
    }
}

module.exports = new RtspService();