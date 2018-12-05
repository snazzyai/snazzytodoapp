const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require("mongojs");
const ObjectId = mongojs.ObjectId;
const app = express();
const PORT = process.env.PORT || 3000;
//connecting to the database
const db = mongojs('simpletodo',['todos']);


//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');



//routes

//get route
app.get('/',(req, res)=>{
    db.todos.find((err, docs)=>{
        res.render('index',{
            title: "Simple Todo App",
            todos: docs
        });
    })
});
//post route
app.post('/todos/add',(req, res)=>{
    var todos = {
        content: req.body.todocontent,
    }
    db.todos.insert(todos, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/');
    });
});
//delete route
app.delete('/todos/delete/:id', (req, res)=>{
    db.todos.remove({_id: ObjectId(req.params.id)}, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/');
    })
})

//port listening
app.listen(PORT, ()=>{
    console.log("connected to server");
})
