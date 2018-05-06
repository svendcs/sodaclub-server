var models  = require('../models');
var require_auth = require('./require_auth');

require_admin = function(req, res, next) {
    if (!req.user.is_admin) {
        res.status(403).json({success: false, error: "Admin privilege required."});
        return;
    }

    next();
}

module.exports = require_admin;
