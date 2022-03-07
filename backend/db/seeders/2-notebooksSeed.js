'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Notebooks', [
      {
        userId: 1,
        title: 'Notebook 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Notebook 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Notebook 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
