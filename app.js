const express = require('express')

const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const url = 'mongodb+srv://masalpradip04:nkHSuq2L1MqtRErh@cluster0.uwbp1.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0';

// Connection to mongodb
mongoose.connect(url)
.then(()=>{
    console.log("Connected to db...")
})
.catch(err =>{
    console.log(err);
})
const app = express()

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");  
app.set('views','./views')

// To route urls with /todo to Todo file 
const Todo = require('./router/Todo')
app.use('/todo',Todo)

//Creating a server 
app.listen(9000, ()=>{
    console.log("Server is running on port 9000 ");
    
})