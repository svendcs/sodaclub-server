var models  = require('../models');
var express = require('express');
var router  = express.Router();
var crypto = require('crypto');


router.post('/login', function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        if(user.confirm_password(req.body.password)) {
            user.generate_token();
            user.save().then(() => {
                res.json({
                    token: user.token,
                    id: user.id,
                    balance: user.balance
                });
            });
        }
        else {
            res.json('no');
        }
    });
});

router.post('/logout', function(req, res) {
    res.json('no');
});

router.post('/request_password_reset', function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        user.generate_reset_key();
        user.save().then(() => {
            res.json(user);
        });
    });
});

router.post('/create', function(req, res) {
    res.send('')
});

router.post('/:id/password_reset', function(req, res) {
    res.send('')
});

router.post('/:id/balance', function(req, res) {
    res.send('')
});

router.post('/:id/finalize', function(req, res) {
    res.send('')
});

module.exports = router;
