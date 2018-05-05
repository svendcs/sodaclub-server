var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/annoucements', function(req, res) {
    res.send('')
});

router.post('/annoucements', function(req, res) {
    res.send('')
});

router.delete('/announcements/:id/', (req, res) => {
    res.send('Current balance');
});

module.exports = router;
