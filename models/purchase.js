'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    refunded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
    Purchase.belongsTo(models.Item, {as: 'item', foreignKey: 'itemId'});
  }

  return Purchase;
};
