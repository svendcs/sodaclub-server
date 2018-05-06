var models  = require('../models');
var express = require('express');
var router  = express.Router();
var crypto = require('crypto');

var require_auth = require('../middleware/require_auth');
var require_admin = require('../middleware/require_admin');

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

router.use('/logout', require_auth);
router.post('/logout', function(req, res) {
    req.user.token = null;
    req.user.save().then(() => {
        res.json({success: true});
    });
});

router.post('/request_password_reset', function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        user.generate_reset_key();
        user.save().then(() => {
            res.json({
                reset_key: user.reset_key,
                id: user.id
            });
        });
    });
});

router.post('/:user_id/password_reset', function(req, res) {
    models.User.findById(req.params.user_id).then(user => {
        if (user == null || user.reset_key == null || user.reset_key != req.body.reset_key) {
            res.status(401).json({success: false, error: "Reset key and user id did not match a user"});
            return;
        }

        user.password = req.body.password;
        user.reset_key = null;
        user.save().then(() => {
            res.json({success: true});
        });
    });
});

router.use('/:user_id', require_auth);
router.get('/:user_id', function(req, res) {
    if (!(req.user.id == req.params.user_id || req.user.is_admin)) {
        res.status(403).json({success: false, error: "You are not authorized to view this resource."});
        return;
    }

    res.render('user', {data: req.user});
});

router.use('/', require_auth);
router.use('/', require_admin);
router.get('/', function(req, res) {
    models.User.findAll().then((users) => {
        res.render('user', {data: users});
    });
});

module.exports = router;
