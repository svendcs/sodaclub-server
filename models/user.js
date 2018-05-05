'use strict';

var crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        password_hash: DataTypes.STRING,
        reset_key: DataTypes.STRING,
        reset_key_date: DataTypes.DATE,
        salt: DataTypes.STRING,
        token: DataTypes.STRING,
        token_date: DataTypes.DATE,
        password: {
            type: DataTypes.VIRTUAL,
            set: function (val) {
                var buf = crypto.randomBytes(10).toString('hex');
                var hash = crypto.createHash('sha256');

                this.setDataValue('password', val);
                this.setDataValue('salt', buf);
                this.setDataValue('password_hash', hash.update(buf + val).digest().toString('hex'));
            }
        }
    }, {
        instanceMethods: {
            generate_reset_key: function() {
                var buf = crypto.randomBytes(16).toString('hex');
                this.setDataValue('reset_key', buf.toString('hex'));
                this.setDataValue('reset_key_date', new Date());
            },
            generate_token: function() {
                var buf = crypto.randomBytes(16).toString('hex');
                this.setDataValue('token', buf.toString('hex'));
                this.setDataValue('token_date', new Date());
            },
            confirm_password: function(password) {
                var hash = crypto.createHash('sha256');
                var buf = hash.update(this.salt + password).digest().toString('hex');
                return buf == this.password_hash;
            }
        }
    });

    // User.associate = function(models) {
    //   models.User.hasMany(models.Task);
    // };

    return User;
};
