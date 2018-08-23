'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      const res1 = queryInterface.addColumn('Purchases', 'price', Sequelize.INTEGER);
      const res2 = res1 && queryInterface.addColumn('Purchases', 'refunded', {type: Sequelize.BOOLEAN, defaultValue: false});
      const res3 = res2 && queryInterface.sequelize.query('update Purchases AS P set price = (select Items.price from Items where Items.id=P.itemId)');
      return res3;
  },
  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('Purchases', 'price');
      queryInterface.removeColumn('Purchases', 'refunded');
  }
};
