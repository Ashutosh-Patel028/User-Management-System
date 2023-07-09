const mysql = require("mysql");
require("dotenv").config();

const dbConnection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

dbConnection.connect((err)=>{
    if(err) throw err;
    else console.log("DB-connection successfull!");
});

module.exports = dbConnection;