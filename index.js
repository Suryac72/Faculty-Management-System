const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
require('dotenv').config()

const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize");
const sequelize = require("./util/database");
const Admin = require("./models/admin");
const Faculty = require("./models/faculty")(sequelize,DataTypes);
const Subject = require("./models/subjects");
const Department = require("./models/department");
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');

//Initializing App
const app = express();

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Init Session :: using express-session package
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true
    },
})
);


//For Passport JS Authentication
app.use(passport.initialize())
app.use(passport.session())
require('./util/passport.auth')


app.use(connectFlash());
app.use((req,res,next) =>{
    res.locals.messages = req.flash();
    next();
})

app.use('/',require('./routes/index.route'));
app.use('/auth',require('./routes/auth.route'))
app.use('/user',require('./routes/user.route'))

app.use((req,res,next) =>{
    next(createHttpErrors.NotFound());
});


app.use((error,req,res,next) =>{
    error.status = error.status || 500
    res.render('error_40x',{error});
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
