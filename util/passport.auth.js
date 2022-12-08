const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { DataTypes } = require("sequelize")
const sequelize = require('../util/database');
const User = require('../models/faculty')(sequelize, DataTypes);

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        try {
           const user = await User.findOne({where: {email:email}});
           if (!user) {
             return done(null, false, { message: "Username/email not registered" });
             }
             const isMatch = await user.isValidPassword(password);
             return isMatch
          ? done(null,user)
          : done(null, false, { message: 'Incorrect password' });
        } catch (error) {
            done(error);
        }
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) { done(null, user); });
});