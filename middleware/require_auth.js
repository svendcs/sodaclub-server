var models  = require('../models');

require_auth = function(req, res, next) {
    if (req.token == null) {
        res.status(401).json({success: false, error: "No bearer token provided."});
        return;
    }

    models.User.findOne({where: {token: req.token}}).then(user => {
        if (user == null) {
            res.status(401).json({success: false, error: "Invalid bearer token provided."});
            return;
        }

        req.user = user;
        next();
    });
}

module.exports = require_auth;
