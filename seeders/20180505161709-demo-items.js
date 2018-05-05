'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Items', [
            {name: 'Soda', price: 2, createdAt: new Date(), updatedAt: new Date()},
            {name: 'Candy Bar', price: 3, createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Items', null, {});
    }
};
