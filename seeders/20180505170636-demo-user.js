'use strict';

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

module.exports = {
    up: (queryInterface, Sequelize) => {
        var buf = crypto.randomBytes(10).toString('hex');

        return queryInterface.bulkInsert('Users', [{
            email: 'svendcs@cs.au.dk',
            is_admin: true,
            password_hash: hash.update(buf + 'password').digest().toString('hex'),
            salt: buf,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
