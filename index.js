const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
require('dotenv').config()
const cookieParser = require('cookie-parser');
const { DataTypes } = require("sequelize")
const sequelize = require("./util/database");
const Admin = require("./models/admin");
const Faculty = require("./models/faculty")(sequelize, DataTypes);
const Subject = require("./models/subjects");
const Department = require("./models/department");
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const connectEnsureLogin = require('connect-ensure-login');
const { roles } = require("./util/constants");




//Initializing App
const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//Init Session :: using express-session package
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    },
    store: new SequelizeStore({
        db: sequelize
    }),

})
);


//For Passport JS Authentication
app.use(passport.initialize())
app.use(passport.session())
require('./util/passport.auth')

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

//Connect Flash for Display Flash Messages
app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
})


//Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'))
app.use('/user', connectEnsureLogin.ensureLoggedIn({ redirectTo: '/auth/login' }),
require('./routes/user.route')
);

app.use('/admin', connectEnsureLogin.ensureLoggedIn({ redirectTo: '/auth/login' }),
    ensureAdmin,
    require('./routes/admin.route')
);



app.use((req, res, next) => {
    next(createHttpErrors.NotFound());
});


//Error Handler and render 404 view when error hits on server
app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.render('error_40x', { error });
})


//Setting the port
const PORT = process.env.PORT || 3000;



/**
 * SYNC with DATABASE
 */


Faculty.hasMany(Department);
Department.hasMany(Subject);
sequelize
    //.sync({force:true})
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    }).then(() => {
        console.log("connected...");
        //Listening for connections on the defined PORT
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.log(err.message));



// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//         next()
//     }else{
//         res.redirect('/auth/login');
//     }
// }

function ensureAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
        next()
    } else {
        req.flash('warning', 'you are not Authorized to access this page');
        res.redirect('/')
    }
}

