const mysql = require("mysql");
require("dotenv").config();

const dbConnection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

dbConnection.connect((err)=>{
    if(err) throw err;
    else console.log("========>DataBase Connected Successfully!");
});

module.exports = dbConnection;