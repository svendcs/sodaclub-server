'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    userId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    refunded: DataTypes.BOOLEAN
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
