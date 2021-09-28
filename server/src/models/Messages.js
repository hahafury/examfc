const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
  });

  Messages.associate = function (models) {
    Messages.belongsTo(models.Conversations, { foreignKey: 'participants', targetKey: 'conversation' });
  };
  return Messages;
};

