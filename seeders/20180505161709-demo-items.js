'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Items', [
            {name: 'Soda', price: 200, createdAt: new Date(), updatedAt: new Date()},
            {name: 'Sun Lolly', price: 175, createdAt: new Date(), updatedAt: new Date()},
            {name: 'Magnum', price: 500, createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Items', null, {});
    }
};
