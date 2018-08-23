var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Serializer = require('sequelize-to-json');

var require_auth = require('../middleware/require_auth');
var require_admin = require('../middleware/require_admin');

const schema = {
    include: ['id', 'user', 'item'],
    assoc: {
        user: {
            include: ['id', 'email']
        },
        item: {
            include: ['id', 'name']
        }
    }
}

router.use(require_auth);
router.get('/', function(req, res) {
    models.Purchase.findAll({where: {userId: req.user.id}, limit: 100, order: 'purchase.createdAt DESC', include: [{model: models.User, as: 'user'}, {model: models.Item, as: 'item'}]}).then(function(purchases) {
        res.json(Serializer.serializeMany(purchases, models.Purchase, schema));
    });
});

router.get('/all', require_admin, function(req, res) {
    models.Purchase.findAll({limit: 100, order: 'purchase.createdAt DESC', include: [{model: models.User, as: 'user'}, {model: models.Item, as: 'item'}]}).then(function(purchases) {
        res.json(Serializer.serializeMany(purchases, models.Purchase, schema));
    });
});

module.exports = router;
