const router = require('express').Router()
const sequelize = require('../util/database');


const Faculty = require('../models/faculty');

router.get('/login',async(req,res,next) =>{
    res.render('login');
})

router.get('/register',async(req,res,next) =>{
   res.render('register');
})

router.get('/logout',async(req,res,next) =>{
    res.render('logout');
})

router.post('/login',async(req,res,next) =>{
    res.send('Login Post');
})

router.post('/register',async(req,res,next) =>{
    try{
        const doesExist = await Faculty.findOne({ where: {email:req.body.email}});
        if(doesExist){
            res.redirect('/auth/register');
            return;
        }
        sequelize.sync()
        .then((result) =>{
            Faculty.create({name: req.body.name, email:req.body.email, contactNumber:req.body.contact,address:req.body.address,password:req.body.password});
            console.log(result);
            res.send('success');
        })
        .catch((error) =>{
            res.redirect('/auth/error');
        })
    }
    catch(error){
        next(error);
    }
   
})

module.exports = router