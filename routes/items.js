var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.Item.findAll().then(function(items) {
        res.json(items);
    });
});

router.post('/:id/buy', function(req, res) {
    res.send('Bought an item')
});

router.put('/:id/', function(req, res) {
    res.send('Updated an item')
});

router.post('/', function(req, res) {
    res.send('Created an item')
});

module.exports = router;
