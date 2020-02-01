require('./db/db')

const express = require('express')
const config = require('config');
const port = config.get('http_port')
const app = express() 

const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use(express.json())
app.use('/api',require('./routes/routes'));

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.set('socketio', io);
