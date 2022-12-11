const router = require('express').Router()
const sequelize = require('../util/database');
const { check, validationResult } = require('express-validator');
const Student = require('../models/student');


/**
 * Route to Fetch All Students
 */
router.get('/students', async(req,res,next) =>{
    try{
        const students = await Student.findAll();
        if(!students){
            req.flash('warning', 'No Student Exists');
            res.redirect('/user/profile');
        }
        else{
            req.flash('success',`Total ${students.length}`);
        //     res.redirect('/user/profile',{students});
              const users = students;
              res.render('manage-users', { users });
         }
    }
    catch(error){
        next(error);
        console.log(error);
    }
});

/**
 * Router to add student
 */

router.post('/add',[
    check('name', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20 }),
    check('rollNo', 'RollNo length should be 10 to 13 characters')
        .isLength({ min: 10, max: 13 }),
],
async (req, res, next) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                req.flash('error', error.msg)
            })
            res.render('register', {
                name: req.body.name,
                branch :req.body.branch,
                section: req.body.section,
                rollNo: req.body.rollno,
                messages: req.flash(),
            })
            return;
        }
        const doesExist = await Student.findOne({ where: { rollNumber: req.body.rollNo } });
        if (doesExist) {
            req.flash('warning', 'Student already exists');
            res.redirect('/auth/add');
            return;
        }
        const user = new Student(req.body);
        console.log(user);
        sequelize.sync()
            .then((result) => {
                Student.create({  name: req.body.name,
                    branch :req.body.branch,
                    section: req.body.section,
                    rollNumber: req.body.rollNo,});
                req.flash('success',`Student registered successfully`)
                res.redirect('/user/profile');
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/user/error');
            })
    }
    catch (error) {
        console.log(error);
        res.redirect('/user/error');
    }
});

router.delete('/delete/:id',async(req,res,next) =>{
    try {
        const { id } = req.params; //destructuring id from url
        console.log(req.params['rollNo']);
        const user = await Student.findOne({ where : {rollNumber : id}});
        console.log(user);
        if (!user) {
            req.flash('error', 'Invalid Id');
            res.status(404);
        }
        else {
             await Student.destroy({
                where: { rollNumber: id}
            })
            res.send(user);
            res.status(204);
           
            
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;