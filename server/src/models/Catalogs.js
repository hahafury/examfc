const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    catalogName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    chats: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  }, {
    timestamps: true,
  });

  return Catalog;
};

