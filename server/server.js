const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

const db = require("./db");
db.connect((err)=>{
    err ? console.log(err) : console.log('Connected...')
});

app.use(cors());
app.use(express.json());

app.post('/menuloader', (req, res) => {
    const path = req.body.path;
    if(path=="/food"){
        db.query('select distinct menu from specifics where category=? and extra=?', ["Food", false], (err, data)=>{
            res.json(data);
        });
    }
    if(path=="/drinks"){
        db.query('select distinct menu from specifics where category=? and extra=?', ["Drink", false], (err, data)=>{
            res.json(data);
        });
    }
    if(path=="/snacks"){
        db.query('select distinct menu from specifics where category=? and extra=?', ["Snack", false], (err, data)=>{
            res.json(data);
        });
    }
    if(path=="/cakes"){
        db.query('select distinct menu from specifics where category=? and extra=?', ["Cake", false], (err, data)=>{
            res.json(data);
        });
    }
});

app.post('/foodloader', (req, res)=>{
    const menuName = req.body.menuName;

    db.query('select distinct specificname, price, specificimg from specifics where menu=?', [menuName], (err, data)=>{
        res.json(data);
    });
});

app.post('/extrasloader', (req, res)=>{
    const specificname = req.body.specificname;

    //This is to get the category of the particular food to know which extras can go with it
    db.query('select distinct category from specifics where specificname=? and extra=?', [specificname, false], (err, data)=>{
        let category = data[0].category;
        db.query('select distinct menu from specifics where category=? and extra=?', [category, true], (err, data1)=>{
            if(data1.length>0){
                let firstmenu = data1[0].menu;
                db.query('select distinct specificname, price, specificimg from specifics where menu=? and extra=?', [firstmenu, true], (err, data2)=>{
                    //data1 is an array of the extras menu for a category (ie Toppings, Protein for Food)
                    //data2 is an array of the specifics of the first menu (ie Peas, Carrot as Toppings) 
                    res.json({extrasmenu: data1, firstmenuspecifics: data2});
                });
            }else{
                res.json({extrasmenu: [], firstmenuspecifics: []});
            }
        });
    });
});

app.post('/extrascontent', (req, res)=>{
    const extrastabname = req.body.extrastabname;

    db.query('select distinct specificname, price, specificimg from specifics where menu=? and extra=?', [extrastabname, true], (err, data)=>{
        res.json(data);
    });
});

app.listen("3001", (req, res)=>{
    console.log('server listening on port 3001...');
});