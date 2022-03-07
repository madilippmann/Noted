'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Untitled Notebook'
    }
  }, {});
  Notebook.associate = function (models) {
    // associations can be defined here
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' })

  };
  return Notebook;
};
