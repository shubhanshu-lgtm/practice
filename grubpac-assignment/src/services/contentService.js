const { Content, ContentSlot, ContentSchedule } = require('../models');
const StorageService = require('./storageService');

class ContentService {
  static async uploadContent(data, file, userId) {
    if (!file) {
      const error = new Error('Please upload a file');
      error.status = 400;
      throw error;
    }

    const { title, subject, description, startTime, endTime, rotationDuration } = data;

    // Use StorageService to handle local vs cloud upload
    const fileUrl = await StorageService.uploadFile(file);

    return await Content.create({
      title,
      subject,
      description,
      fileUrl,
      fileType: file.mimetype,
      fileSize: file.size,
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      rotationDuration: rotationDuration ? parseInt(rotationDuration) : 5,
      uploadedBy: userId,
      status: 'pending',
    });
  }

  static async getMyContent(userId, { page = 1, limit = 10, subject, status }) {
    const offset = (page - 1) * limit;
    const where = { uploadedBy: userId };
    
    if (subject) where.subject = subject;
    if (status) where.status = status;

    const { count, rows } = await Content.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      contents: rows,
    };
  }

  static async getAllContent({ page = 1, limit = 10, subject, status, teacherId }) {
    const offset = (page - 1) * limit;
    const where = {};
    
    if (subject) where.subject = subject;
    if (status) where.status = status;
    if (teacherId) where.uploadedBy = teacherId;

    const { count, rows } = await Content.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      contents: rows,
    };
  }

  static async getPendingContent() {
    return await Content.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'DESC']],
    });
  }

  static async approveContent(id, { status, rejectionReason }, userId) {
    if (!['approved', 'rejected'].includes(status)) {
      const error = new Error('Invalid status');
      error.status = 400;
      throw error;
    }

    if (status === 'rejected' && !rejectionReason) {
      const error = new Error('Rejection reason is required');
      error.status = 400;
      throw error;
    }

    const content = await Content.findByPk(id);

    if (!content) {
      const error = new Error('Content not found');
      error.status = 404;
      throw error;
    }

    content.status = status;
    content.rejectionReason = status === 'rejected' ? rejectionReason : null;
    content.approvedBy = userId;
    content.approvedAt = status === 'approved' ? new Date() : null;

    await content.save();

    // If approved, set up the schedule
    if (status === 'approved') {
      let slot = await ContentSlot.findOne({ where: { subject: content.subject } });
      if (!slot) {
        slot = await ContentSlot.create({ subject: content.subject });
      }

      const lastSchedule = await ContentSchedule.findOne({
        where: { slotId: slot.id },
        order: [['rotationOrder', 'DESC']],
      });

      const nextOrder = lastSchedule ? lastSchedule.rotationOrder + 1 : 1;

      await ContentSchedule.create({
        contentId: content.id,
        slotId: slot.id,
        rotationOrder: nextOrder,
        duration: content.rotationDuration || 5,
      });
    }

    return content;
  }
}

module.exports = ContentService;
