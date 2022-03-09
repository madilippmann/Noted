'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tags', [
      {
        userId: 1,
        name: 'Tag 1',
        noteId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'Tag 2',
        noteId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'Tag 3',
        noteId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 3',
        noteId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 4',
        noteId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 4',
        noteId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 3',
        noteId: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: 1,
        name: 'Tag 1',
        noteId: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tags', null, {});
  }
};
