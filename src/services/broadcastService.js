const { Content, ContentSchedule, User } = require('../models');
const { Op } = require('sequelize');
const cache = require('../utils/cache');

class BroadcastService {
  static async getLiveContentByTeacher(teacherId) {
    const cacheKey = `live_content_${teacherId}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log('Serving live content from cache...');
      return cachedData;
    }

    // 1. Verify teacher exists
    const teacher = await User.findOne({ where: { id: teacherId, role: 'teacher' } });
    if (!teacher) {
      return null;
    }

    // 2. Get all approved content for this teacher that is within the time window
    const now = new Date();
    const activeContents = await Content.findAll({
      where: {
        uploadedBy: teacherId,
        status: 'approved',
        startTime: { [Op.lte]: now },
        endTime: { [Op.gte]: now },
      },
      include: [
        {
          model: ContentSchedule,
          as: 'schedules',
          required: true,
        },
      ],
    });

    if (!activeContents || activeContents.length === 0) {
      return null;
    }

    // 3. Group by subject and find active item for each subject
    const subjects = [...new Set(activeContents.map((c) => c.subject))];
    const liveContent = [];

    for (const subject of subjects) {
      const subjectContents = activeContents
        .filter((c) => c.subject === subject)
        .sort((a, b) => a.schedules[0].rotationOrder - b.schedules[0].rotationOrder);

      if (subjectContents.length === 0) continue;

      // Calculate total duration for this subject's rotation
      const totalDuration = subjectContents.reduce((sum, c) => sum + (c.schedules[0].duration || 5), 0);
      
      // Get current time in minutes since epoch
      const currentMinutes = Math.floor(Date.now() / 60000);
      const offset = currentMinutes % totalDuration;

      let elapsed = 0;
      let activeItem = null;

      for (const content of subjectContents) {
        const duration = content.schedules[0].duration || 5;
        if (offset >= elapsed && offset < elapsed + duration) {
          activeItem = content;
          break;
        }
        elapsed += duration;
      }

      // Fallback
      if (!activeItem && subjectContents.length > 0) {
        activeItem = subjectContents[0];
      }

      if (activeItem) {
        liveContent.push({
          subject: activeItem.subject,
          title: activeItem.title,
          description: activeItem.description,
          fileUrl: activeItem.fileUrl,
          fileType: activeItem.fileType,
          startTime: activeItem.startTime,
          endTime: activeItem.endTime,
        });
      }
    }

    const result = liveContent.length > 0 ? liveContent : null;
    if (result) {
      // Cache for 1 minute for faster response
      cache.set(cacheKey, result, 60);
    }
    return result;
  }
}

module.exports = BroadcastService;
