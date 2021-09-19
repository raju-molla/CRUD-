const express = require('express');
const app = express();
require('dotenv').config();
const studentRoute = require('./route/student');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

// bodyParser
app.use(bodyParser.json());

// student route
app.use(studentRoute);






// database 
mongoose.connect('mongodb://localhost:27017/student')
.then(()=>console.log('Database connected successfully!'))
.catch((err)=>console.log(err))


// for home route
app.get('/',(req,res)=>{
    res.json({
        mgs: "This is home page"
    })
})
// for wrong route
app.get('*', (req,res)=>{
    res.json({
        mgs: 'Sorry router is not found'
    })
})
// server create
const port=process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})