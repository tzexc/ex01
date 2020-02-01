const { Rtsp } = require('../models/rtsp');
const rtsp = require('rtsp-ffmpeg') 

class RtspSocketService{
    constructor(){
        this.camsLenght = 0;
    }
   
    inititlizeCams(rtsps, io){
        const cams = rtsps.map((item,index)=>{
            var stream = new rtsp.FFMpeg({input: item.url, resolution: '320x240', quality: 3});
            stream.on('start', function() {
                console.log(`stream  ${index}- ${item._id}' started`);
            });
            stream.on('stop', function() {
                console.log(`stream  ${index}- ${item._id}' stopped`);
            });
            stream.cams_id = item._id;
            return stream;
        });

        cams.forEach((camStream, i) =>{
            const ns = io.of(`/cam_${camStream.cams_id}`);

            ns.on('connection', (wsocket)=> {
                console.log('connected to /cam_' + i);
                const pipeStream = (data)=> {
                    wsocket.emit('data', data);
                };

                camStream.on('data', pipeStream);

                wsocket.on('disconnect', ()=> {
                    console.log('disconnected from /cam_' + i);
                    camStream.removeListener('data', pipeStream);
                });
            });
        });

        this.camsLenght = cams.length;
    }

    startSocket(io){
        io.on('connection', (socket) => {
            socket.emit('rtsp', this.camsLenght);
        });
    }

    disconnect(){
        io.on('end',  () =>{
            socket.disconnect(0);
        });
    }
}

module.exports = new RtspSocketService();