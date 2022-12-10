const { DataTypes } = require("sequelize")
const sequelize = require('../util/database');
const faculty = require('../models/faculty')(sequelize, DataTypes);

const router = require('express').Router()

router.get('/profile',async(req,res,next) =>{
    const person = req.user;
    res.render('dashboard',{person});
})

router.get('/account',async(req,res,next) =>{
    const person = req.user;
    res.render('profile',{person});
})
module.exports = router