'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Untitled'
    },
    content: DataTypes.TEXT,
    notebookId: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {});
  Note.associate = function (models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' })
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' })

  };
  return Note;
};
