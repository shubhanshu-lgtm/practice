const sequelize = require('../config/database');
const User = require('./User');
const Content = require('./Content');
const ContentSlot = require('./ContentSlot');
const ContentSchedule = require('./ContentSchedule');

// User -> Content (Uploaded by)
User.hasMany(Content, { foreignKey: 'uploadedBy', as: 'uploadedContents' });
Content.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

// User -> Content (Approved by)
User.hasMany(Content, { foreignKey: 'approvedBy', as: 'approvedContents' });
Content.belongsTo(User, { foreignKey: 'approvedBy', as: 'approver' });

// Content -> ContentSchedule
Content.hasMany(ContentSchedule, { foreignKey: 'contentId', as: 'schedules' });
ContentSchedule.belongsTo(Content, { foreignKey: 'contentId', as: 'content' });

// ContentSlot -> ContentSchedule
ContentSlot.hasMany(ContentSchedule, { foreignKey: 'slotId', as: 'schedules' });
ContentSchedule.belongsTo(ContentSlot, { foreignKey: 'slotId', as: 'slot' });

module.exports = {
  sequelize,
  User,
  Content,
  ContentSlot,
  ContentSchedule,
};
