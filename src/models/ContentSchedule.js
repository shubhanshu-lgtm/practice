const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentSchedule = sequelize.define('ContentSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  slotId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rotationOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false,
    defaultValue: 5,
  },
});

module.exports = ContentSchedule;
