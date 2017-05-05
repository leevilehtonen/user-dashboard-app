const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register', err:err });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePasswords(password, user.password, (err, isMatch)=> {
            if(err) throw err;
            let payload = {
                "sub" : user._id,
                "name" : user.name,
            }

            if(isMatch) {
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 604800
                });
                res.cookie('XSRF-TOKEN', req.csrfToken(), { secure : true });
                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    msg: 'Logged in'
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password'});
            }
        });
    });

});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;