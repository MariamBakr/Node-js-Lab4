const express = require('express')
const app = express();
const path=require("path")
const http=require('http');
const server=http.createServer(app);
const io=require('socket.io')(server)
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'socket.html')))

io.on('connection',function(client)
{

    client.on('sendmsg',function(data)
    {

        client.broadcast.emit("msg",data);
    })
})
server.listen(7000, () => console.log("listen..."))