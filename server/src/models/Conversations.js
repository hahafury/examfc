const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define('Conversations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    participants: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    blackList: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
    favoriteList: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
  }, {
    timestamps: true,
  });

  Conversations.associate = function (models) {
    Conversations.hasMany(models.Messages, { foreignKey: 'conversation', targetKey: 'participants' });
  };
  Conversations.associate = function (models) {
    Conversations.hasMany(models.Catalogs, { foreignKey: 'chats', targetKey: 'id' });
  };

  return Conversations;
};

