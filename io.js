var io = require('socket.io')()

//listen for new connections from clients sockets

io.on('connection', function(socket){
    console.log('client connected to socket.io')
    
    //when client add-circle's, send data and message to all clients
    socket.on('add-circle', function(data){
        //emit to all clients
        io.emit('add-circle', data)
    })
    
    socket.on('clear-page', function(){
        io.emit('clear-page')
    })
})




//io represents socket.io on the server so lets export
module.exports = io

