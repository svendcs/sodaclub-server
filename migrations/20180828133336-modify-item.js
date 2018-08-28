'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      const res1 = queryInterface.addColumn('Items', 'enabled', {type: Sequelize.BOOLEAN, defaultValue: true});
      const res2 = res1 && queryInterface.sequelize.query('update Items set enabled=TRUE');
      return res2;
  },
  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('Items', 'enabled');
  }
};
