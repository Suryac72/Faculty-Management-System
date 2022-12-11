const { DataTypes } = require("sequelize")
const sequelize = require('../util/database');
const faculty = require('../models/faculty')(sequelize, DataTypes);
const Student = require('../models/student');
const router = require('express').Router()

router.get('/profile',async(req,res,next) =>{
    let person = req.user;
    let profile = req.user;
    if(req.user.role === 'FACULTY'){
        person = await Student.findAll();
        res.render('dashboard',{person,profile});
    }
    else{
        person = req.user;
        res.render('dashboard',{person});
    }
   
})


router.get('/account',async(req,res,next) =>{
    const person = req.user;
    res.render('profile',{person});
})
module.exports = router