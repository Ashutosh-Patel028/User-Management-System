const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors=require("cors");
const dbConnection = require("./database/db.js");

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

//insert to DB - endpoint
app.post("/post/users",(req,res)=>{
    const {name,email,phone}=req.body;
    const sqlInsert="INSERT into  users(name,email,phone) VALUES(?,?,?)";
    dbConnection.query(sqlInsert,[name,email,phone],(err,rows)=>{
        if(err){ 
            console.log(err);
            res.send(err);
        }
        else{
            res.send("inserted successfully")
            console.log(rows);
        }
    })
})

//delete a user from DB - endpoint
app.delete("/delete/users/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM  users WHERE id=?";
    dbConnection.query(sqlRemove,id,(err,rows)=>{
        if(err) console.log(err);
        console.log(rows);
    })
})

//get users from DB - enpoint
app.get("/get/users",(req,res)=>{
    const sqlGet="SELECT * FROM users";
    dbConnection.query(sqlGet,(err,rows)=>{
        if(err) console.log(err);
        res.send(rows);
    })
})

//get a user from DB - endpoint
app.get("/get/users/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM users WHERE id=?";
    dbConnection.query(sqlGet,id,(err,rows)=>{
        if(err) console.log(err);
        res.send(rows);
    })
});

//Update a user to DB - endpoint
app.put("/put/users/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,phone} = req.body;
    const sqlUpdate="UPDATE users set name=?, email=?, phone=? WHERE id=?";
    dbConnection.query(sqlUpdate,[name,email,phone,id],(err,rows)=>{
        if(err) console.log(err);
        res.send(rows);
    })
})

//Home Route
app.get("/",(req,res)=>{
    const message= "<div style='width:50%;margin:auto; text-align:center;'><h1>Welcome to Backend Service for User Mangement System 👨‍💻.</h1><h2>Use routes for action 💨</h2></div>"
    const m2="Welcome to Backend Service for User Mangement System 👨‍💻.\n Use routes for action 💨"
    res.send(message);
})

//listen app
app.listen(5000,()=>{
    console.log("server is running on 5000");
})