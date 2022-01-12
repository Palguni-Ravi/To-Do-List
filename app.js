const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js"); 
const items = [];
const workItems = [];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended :true}));
app.use(express.static("public"));
app.listen(3000,function(){
    console.log("Server started on port 3000..");
});
app.get("/",function(req,res){
    const day = date.getDate();
   res.render("list",{listTitle : day , nextItems : items});
});
app.post("/",function(req,res){
    let item = req.body.nextItem;
    if(req.body.list === "Work List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});
app.get("/work",function(req,res)
{
    res.render("list",{listTitle : "Work List" , nextItems : workItems});
});
