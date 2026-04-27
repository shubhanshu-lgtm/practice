const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentSlot = sequelize.define('ContentSlot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = ContentSlot;
