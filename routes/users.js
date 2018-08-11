var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Serializer = require('sequelize-to-json');

var require_auth = require('../middleware/require_auth');
var require_admin = require('../middleware/require_admin');

var env = process.env.NODE_ENV || 'development';
var frontendConfig = require('../config/frontend.js')[env];

router.post('/login', function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        if(user != null && user.confirm_password(req.body.password)) {
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
            res.status(401).json({success: false, error: "Wrong username or password"});
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

router.post('/request_password_reset', require_auth, require_admin, function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        if (user == null) {
            res.status(404).json({success: false, error: 'User does not exist'});
            return;
        }

        user.generate_reset_key();
        user.save().then(() => {
            // reset_key: user.reset_key,
            // id: user.id
            res.mailer.send('password-reset', {
                to: user.email,
                subject: 'Soda Club password reset',
                reset_link: frontendConfig.password_reset_link + user.id + '/' + user.reset_key
            }, function (err) {
                if (err) {
                    console.log(err)
                    res.status(500).json({success: false, error: 'There was an error sending the email'});
                    return;
                }
                res.json({});
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
        user.generate_token();
        user.save().then(() => {
            res.json({
                token: user.token,
                id: user.id,
                balance: user.balance
            });
        });
    });
});

router.use('/:user_id', require_auth);
router.get('/:user_id', function(req, res) {
    if (!(req.user.id == req.params.user_id || req.user.is_admin)) {
        res.status(403).json({success: false, error: "You are not authorized to view this resource."});
        return;
    }

    if (req.user.id == req.params.user_id) {
        res.json(new Serializer(models.User, {include: ['id', 'email', 'balance', 'is_admin']}).serialize(req.user));
    }
    else {
        models.User.findById(req.params.user_id).then(user => {
            if (user == null) {
                res.status(404).json({success: false, error: "User does not exist."});
            }
            res.json(new Serializer(models.User, {include: ['id', 'email', 'balance', 'is_admin']}).serialize(user));
        });
    }
});

router.get('/', require_auth, require_admin, function(req, res) {
    models.User.findAll().then((users) => {
        res.json(Serializer.serializeMany(users, models.User, {include: ['id', 'email', 'balance', 'is_admin']}));
    });
});

router.post('/', require_auth, require_admin, function(req, res) {
    models.User.find({
        where: {email: req.body.email}
    }).then(user => {
        if (user != null) {
            res.status(401).json({success: false, error: 'A user with that email already exists.'});
            return;
        }

        user = models.User.build({
            email: req.body.email,
            balance: req.body.balance,
        });

        user.generate_reset_key();
        user.save().then(() => {
            res.mailer.send('user-invite', {
                to: user.email,
                subject: 'Invite to the MADALGO Soda Club',
                reset_link: frontendConfig.password_reset_link + user.id + '/' + user.reset_key,
                info_link: frontendConfig.info_link
            }, function (err) {
                if (err) {
                    res.status(500).json({success: false, error: 'There was an error sending the email'});
                    return;
                }
                res.json({});
            });
        });
    });
});

router.post('/:user_id/deposit', require_auth, require_admin, function(req, res) {
    if (req.body.amount == null) {
        res.status(400).json({success: false, error: "User does not exist."});
        return;
    }

    req.body.amount = parseInt(req.body.amount);

    models.User.findById(req.params.user_id).then(user => {
        user.balance += req.body.amount;
        user.save().then(() => {
            res.json({});
        });
    });
});

module.exports = router;
