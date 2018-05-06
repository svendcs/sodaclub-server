var models  = require('../models');
var express = require('express');
var router  = express.Router();

var require_auth = require('../middleware/require_auth');
var require_admin = require('../middleware/require_admin');

router.use(require_auth);

router.get('/', function(req, res) {
    models.Item.findAll().then(function(items) {
        res.render('item', {data: items});
    });
});

router.post('/:item_id/purchase', function(req, res) {
    models.Item.findById(req.params.item_id).then((item) => {
        if (item == null) {
            res.status(404).json({success: false, error: "Item does not exist."});
            return;
        }

        if (item.price > req.user.balance) {
            res.status(503).json({"success": false, "error": "the user can not afford the item."});
            return;
        }

        // TODO: ensure atomicity
        models.Purchase.create({
            userId: req.user.id,
            itemId: item.id
        }).then((test) => {
            req.user.balance -= item.price;
            req.user.save().then(() => {
                res.render('user', {data: req.user});
            });
        });
    });
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
    }).then((item) => {
        res.send();
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
