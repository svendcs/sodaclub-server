'use strict';

var bcrypt = require("bcrypt-nodejs");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'svendcs@cs.au.dk',
            is_admin: true,
            password_hash: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
