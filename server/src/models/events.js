const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    eventOwner: {
      type: DataTypes.INTEGER,
    },
    eventInfo: {
      type: DataTypes.TEXT,
    },
    eventDateOfNotification: {
      type: DataTypes.DATE,
    },
    eventDeadline: {
      type: DataTypes.DATE,
    },
    eventDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: false,
  });

  return Events;
};

