var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Serializer = require('sequelize-to-json');

var require_auth = require('../middleware/require_auth');
var require_admin = require('../middleware/require_admin');

const schema = {
    include: ['id', 'name', 'price', 'enabled'],
}

router.use(require_auth);
router.get('/', function(req, res) {
    models.Item.findAll().then(function(items) {
        res.json(Serializer.serializeMany(items, models.Item, schema));
    });
});

router.post('/:item_id/purchase', function(req, res) {
    models.Item.findById(req.params.item_id).then((item) => {
        if (item == null) {
            res.status(404).json({success: false, error: "Item does not exist."});
            return;
        }

        if (item.price > req.user.balance) {
            res.status(400).json({"success": false, "error": "the user can not afford the item."});
            return;
        }

        // TODO: ensure atomicity
        models.Purchase.create({
            userId: req.user.id,
            itemId: item.id,
            price: item.price
        }).then((test) => {
            req.user.balance -= item.price;
            req.user.save().then(() => {
                res.json({
                    balance: req.user.balance
                });
            });
        });
    });
});

router.post('/:item_id/enable', require_admin, function(req, res) {
    models.Item.findById(req.params.item_id).then((item) => {
        if (item == null) {
            res.status(404).json({success: false, error: "Item does not exist."});
            return;
        }

        if (item.enabled) {
            res.status(400).json({"success": false, "error": "Item is already enabled."});
            return;
        }

        item.enabled = true;
        item.save().then(() => {
            res.json({});
        });
    });
});

router.post('/:item_id/disable', require_admin, function(req, res) {
    models.Item.findById(req.params.item_id).then((item) => {
        if (item == null) {
            res.status(404).json({success: false, error: "Item does not exist."});
            return;
        }

        if (!item.enabled) {
            res.status(400).json({"success": false, "error": "Item is already disabled."});
            return;
        }

        item.enabled = false;
        item.save().then(() => {
            res.json({});
        });
    });
});

router.put('/:item_id/', require_admin, function(req, res) {
    data = {
        name: req.body.name,
        price: req.body.price
    }

    models.Item.update(data, {
        where: {
            id: req.params.item_id
        }
    }).then((item) => {
        res.json({});
    });
});

router.post('/', require_admin, function(req, res) {
    data = {
        name: req.body.name,
        price: req.body.price
    }

    models.Item.create(data).then(function() {
        res.json({});
    });
});

module.exports = router;
