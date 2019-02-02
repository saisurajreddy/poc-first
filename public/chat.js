var socket=io.connect("http://localhost:5000");

var message=document.getElementById('message'),
    handle=document.getElementById('handle'),
    btn=document.getElementById('send'),
    output=document.getElementById('output');
    feedback=document.getElementById('feedback');

btn.addEventListener('click', function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    console.log("feedback");
    socket.emit('typing', handle.value);
});

socket.on('chat', function(data){
    output.innerHTML+='<p><strong>'+data.handle+': </strong>'+data.message+'</p';
    feedback.innerHTML="";
});

socket.on('typing', function(data){
    feedback.innerHTML='<p><em>'+data+' is typing....</em></p>';
});