'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Alec',
        lastName: 'Keeler',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Jeff',
        lastName: 'Granof',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'JD',
        lastName: 'Richards',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    }, {});
  }
};
