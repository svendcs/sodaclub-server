var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.Item.findAll().then(function(items) {
        res.json(items);
    });
});

router.post('/:item_id/buy', function(req, res) {
});

router.put('/:item_id/', function(req, res) {
    data = {
        name: req.body.name,
        price: req.body.price
    }

    models.Item.update(data, {
        where: {
            id: req.params.item_id
        }
    }).then(function() {
        res.json({});
    });
});

router.delete('/:item_id/', function(req, res) {
    models.Item.destroy({
        where: {
            id: req.params.item_id
        }
    }).then(function() {
        res.json({});
    });
});

router.post('/', function(req, res) {
    data = {
        name: req.body.name,
        price: req.body.price
    }

    models.Item.create(data).then(function() {
        res.json({});
    });
});

module.exports = router;
