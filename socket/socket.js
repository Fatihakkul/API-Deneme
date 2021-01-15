const Message = require('../model/messages')
module.exports = function(io){
        
        io.on('connection',socket=>{
            console.log(socket.id , "socket=====")
            let user={}
            socket.on('user_connected',user=>{
                console.log(user)
                socket.id=user.id
                
            })
            
            socket.on('send_message',(message)=>{
                console.log(message, '======',message.id)
                io.to(message.id).emit('new_message',message)
            })

        })

}