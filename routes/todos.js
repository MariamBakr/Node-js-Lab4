const express=require("express");
const router=express.Router();
const path=require('path');
const fs= require('fs');
router.use(express.urlencoded({extended:true}));
let arr=[{name:"task1",id:1},{name:"task2",id:2}]
router.get('/gettodos',function(req,res)
{  
    res.send(arr)
    }

)
router.get('/add',function(req,res){

    res.sendFile(path.join(__dirname,'../todo.html'))
})
router.post('/add',function(req,res)
{  

let item=req.body
arr.push(item)
res.send(`Item added successfully`)

}

)

router.get('/gettodos/:id',function(req,res){
    let identify=req.params.id;
    let obj=arr.find((item)=>item.id==identify);
    let i= obj.name
    res.send(`Todo item with this ID is => ${i}`)
})

module.exports=router;