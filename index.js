const express= require('express');
const path=require('path');
const fs= require('fs');
const server= express();
const todos_Route=require('./routes/todos')
server.use('/todo',todos_Route)

server.use(express.urlencoded({extended:true}));

server.get("/login",function(req,res){
    res.sendFile(path.join(__dirname,'login.html'))
})
server.post("/login",function(req,res){
        let user=req.body.username
        let users=fs.readFileSync("registered.json","utf-8");
        users=JSON.parse(users);
    if(users.find((item)=>item.username==user)){
    res.send(`logged in successfully as => ${user}`)
    }else{

        res.sendStatus(401)

    }
})
server.get("/register",function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))})

server.post("/register",function(req,res){
    let user=req.body.username
    let pass=req.body.password
    let first=req.body.fname
    if(user.length===0 || pass.length===0 || first.length===0){
        res.sendStatus(422)}else{
    let users=fs.readFileSync("registered.json","utf-8");
        users=JSON.parse(users);
        users.push(req.body);
        fs.writeFileSync("registered.json",JSON.stringify(users,null,2),'utf-8');
        res.send("user was registered successfully");
    }
})


server.listen(9000,function()
{
console.log("listen");
})