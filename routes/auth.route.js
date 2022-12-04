const router = require('express').Router()
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
    const faculty = new Faculty(req.body);
    
    res.send(req.body);
})

module.exports = router