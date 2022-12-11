const { DataTypes } = require("sequelize")
const sequelize = require("../util/database");
const Faculty = require('../models/faculty')(sequelize, DataTypes);
const {roles} = require('../util/constants')
const router = require('express').Router()

router.get('/users', async (req, res, next) => {
    try {
        const users = await Faculty.findAll();
        res.render('manage-users', { users });
    } catch (error) {
        next(error);
    }
})

router.get('/profile',async(req,res,next) =>{
    try{
        const person = await Faculty.findAll();
        const profile = req.user;
        res.render('dashboard',{person,profile});
    }
    catch (error) {
        next(error);
    }
})


router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params; //destructuring id from url
        const user = await Faculty.findByPk(id)
        if (!user) {
            req.flash('error', 'Invalid Id');
            res.redirect('/admin/users');
            return;
        }
        else {
            const person = user;
            res.render('profile', { person })
        }
    } catch (error) {
        next(error);
    }
})

router.post('/update-role', async (req, res, next) => {

try{
    const { id, role} = req.body;
    //checking for id and roles in body
    if (!id || !role) {
        req.flash('error', 'Invalid Request')
        return res.redirect('back');
    }


    // Check for Valid role
    const rolesArray = Object.values(roles);
    console.log(rolesArray);
    if (!rolesArray.includes(role)) {
      req.flash('error', 'Invalid role');
      return res.redirect('back');
    }

    // Admin cannot remove himself/herself as an admin.
    if(req.user.id == id) {
        req.flash(
            'error',
            'Admins cannot remove themselves from Admin, ask another admin.'
        );
       return res.redirect('back');
    }

    else{
        await Faculty.update({ role: role }, {
            where: {
              id: id
            }
          }).then(async function() { 
            const user = await Faculty.findByPk(id);
            req.flash('info', `updated role for ${user.email} to ${user.role}`);
            res.redirect('back');
       
        })
    }
    
      } catch (error) {
        next(error);
      }
});

module.exports = router;