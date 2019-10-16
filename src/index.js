const express = require('express');

const ejs = require('ejs-mate');

const path = require('path');

const socketIO = require('socket.io');

const http = require('http');

// initializations
const app = express();

const server = http.Server(app);

const io = socketIO(server);

// settings
app.set('port', process.env.PORT || 4000);

app.engine('ejs', ejs);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

// Routes
app.use(require('./routes/'));

// sockets
require('./sockets')(io);

 //Static Files
app.use(express.static(path.join(__dirname,'public')));

// Run server
server.listen(app.get('port'), () => {
     console.log('Server on port '+app.get('port'));
});