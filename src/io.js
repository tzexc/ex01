   const rtsp = require('rtsp-ffmpeg') 
   
   module.exports = function(io) {
       
       console.log("io")
        var cams = [
            'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
            , 'rtsp://192.168.68.111/h264main'
            , 'rtsp://170.93.143.139/rtplive/470011e600ef003a004ee33696235daa'
        ].map(function(uri, i) {
            var stream = new rtsp.FFMpeg({input: uri, resolution: '320x240', quality: 3});
            stream.on('start', function() {
                console.log('stream ' + i + ' started');
            });
            stream.on('stop', function() {
                console.log('stream ' + i + ' stopped');
            });
            return stream;
        });

    cams.forEach(function(camStream, i) {
        var ns = io.of('/cam' + i);
        ns.on('connection', function(wsocket) {
            console.log('connected to /cam' + i);
            var pipeStream = function(data) {
                wsocket.emit('data', data);
            };
            camStream.on('data', pipeStream);

            wsocket.on('disconnect', function() {
                console.log('disconnected from /cam' + i);
                camStream.removeListener('data', pipeStream);
            });
        });
    });
    io.on('connection', function(socket) {
	    socket.emit('rtsp', cams.length);
    });

};