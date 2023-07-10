/*const fs = require("fs");
const readline = require("readline");
const db = require("./db");
db.connect((err)=>{
    err ? console.log(err) : console.log('Connected...');
});

var lineReader = readline.createInterface({input:fs.createReadStream('./final.txt')});
let x=0;
lineReader.on("line", (line)=>{
    if(x!=0){  
        line = line.split(",");  
        db.query("insert into specifics (specificname, menu, price, category, extra, specificimg) values (?, ?, ?, ?, ?, ?)",
            [ line[0].trim(), line[2].trim(), line[1].trim(), "Drink", false, "img/drinks/"+line[3].trim() ]);
        console.log("Line"+x);
    }
    x++;
});*/