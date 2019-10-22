module.exports = io => {
     io.on('connection', socket => {
          console.log('New User');
          socket.on('userCoord', (coords)  => {                           
               socket.broadcast.emit('newUserCoord', coords);
           });
     });
};