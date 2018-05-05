'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Items', 'price', Sequelize.INTEGER)
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Items', 'price')
  }
};
