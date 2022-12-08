const router = require('express').Router()
const sequelize = require('../util/database');
const { DataTypes } = require("sequelize")
const Faculty = require('../models/faculty')(sequelize, DataTypes);
const { check, validationResult } = require('express-validator');
const passport = require('passport')

router.get('/login', async (req, res, next) => {
    res.render('login');
})

router.get('/register', async (req, res, next) => {
    res.render('register');
})



router.get('/logout', function(req, res, next) {
    req.logout(function() {
      res.redirect('/');    
    });
  });

router.post('/login',passport.authenticate('local',{
    successRedirect :"/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
},

));

router.post('/register'
    , [
        check('email', 'Email length should be 10 to 30 characters')
            .isEmail().isLength({ min: 10, max: 30 }),
        check('name', 'Name length should be 10 to 20 characters')
            .isLength({ min: 10, max: 20 }),
        check('contact', 'Mobile number should contains 10 digits')
            .isLength({ min: 10, max: 10 }),
        check('password', 'Password length should be 8 to 10 characters')
            .isLength({ min: 8, max: 10 }),
        check('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(error => {
                    req.flash('error', error.msg)
                })
                res.render('register', {
                    email: req.body.email,
                    name: req.body.name,
                    contact: req.body.contact,
                    address: req.body.address,
                    messages: req.flash(),
                })
                return;
            }
            const doesExist = await Faculty.findOne({ where: { email: req.body.email } });
            if (doesExist) {
                res.redirect('/auth/register');
                return;
            }
            const user = new Faculty(req.body);
            console.log(user);
            sequelize.sync()
                .then((result) => {
                    Faculty.create({ name: req.body.name, email: req.body.email, contactNumber: req.body.contact,
                         address: req.body.address, password: req.body.password });
                    req.flash('success',`${user.email} registered successfully`)
                    res.redirect('/auth/login');
                })
                .catch((error) => {
                    console.log(error);
                    res.redirect('/auth/error');
                })
        }
        catch (error) {
            console.log(error);
            res.redirect('/auth/error');
        }

    })

module.exports = router