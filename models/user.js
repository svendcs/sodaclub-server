'use strict';

var bcrypt = require("bcrypt-nodejs");
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
    password: {
        type: DataTypes.VIRTUAL,
        set: function (val) {
            this.setDataValue('password', val);
            this.setDataValue('password_hash', bcrypt.hashSync(val, bcrypt.genSaltSync(8), null));
        }
    }
  });

  // User.associate = function(models) {
  //   models.User.hasMany(models.Task);
  // };

  return User;
};
