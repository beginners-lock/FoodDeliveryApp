const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Porsche911turbo$$",
    database: "food_delivery",
    port: "3306"
});

module.exports = db;