'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Tags', [
      {
        userId: 1,
        name: 'Tag 1',
        noteId: 12
      },
      {
        userId: 1,
        name: 'Tag 2',
        noteId: 12
      },
      {
        userId: 1,
        name: 'Tag 3',
        noteId: 12
      }, {
        userId: 1,
        name: 'Tag 4',
        noteId: 39
      }, {
        userId: 1,
        name: 'Tag 1',
        noteId: 39
      }, {
        userId: 1,
        name: 'Tag 1',
        noteId: 32
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 7
      }, {
        userId: 1,
        name: 'Tag 3',
        noteId: 7
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 17
      }, {
        userId: 1,
        name: 'Tag 4',
        noteId: 17
      }, {
        userId: 1,
        name: 'Tag 4',
        noteId: 16
      }, {
        userId: 1,
        name: 'Tag 2',
        noteId: 23
      }, {
        userId: 1,
        name: 'Tag 3',
        noteId: 30
      }, {
        userId: 1,
        name: 'Tag 1',
        noteId: 30
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tags', null, {});
  }
};
