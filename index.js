var express=require('express');
var socket=require('socket.io');

const port = process.env.PORT || 5000;

var app=express();
var server=app.listen(5000,function(){
    console.log("listening on port 5000");
});

app.use(express.static('public'));

var io=socket(server);

io.on('connection', function(socket){
    console.log("socket connection made ", socket.id);

    socket.on('chat', function(data){
        console.log("broadcast");
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        console.log("feedback broadcast");
        socket.broadcast.emit('typing', data);
    });
});