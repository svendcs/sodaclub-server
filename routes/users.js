var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/login', function(req, res) {
    res.send('')
});

router.post('/logout', function(req, res) {
    res.send('')
});

router.post('/request_password_reset', function(req, res) {
    res.send('')
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
