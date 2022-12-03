const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
require('dotenv').config()

const Sequelize = require("sequelize");
const sequelize = require("./util/database");
const Admin = require("./models/admin");
const Faculty = require("./models/faculty");
const Subject = require("./models/subjects");
const Department = require("./models/department");



const app = express();

app.use(morgan('dev'));

app.get('/',(req,res,next)=>{
    res.send('working');
});

app.use((req,res,next) =>{
    next(createHttpErrors.NotFound());
});


app.use((error,req,res,next) =>{
    error.status = error.status || 500
    res.status(error.status);
    res.send(error);
})

const PORT = process.env.PORT || 3000;

Faculty.hasMany(Department);
Department.hasMany(Subject);


/**
 * SYNC with DATABASE
 */
sequelize
    //.sync({force:true})
    .sync()
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
