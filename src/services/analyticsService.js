const { Content, ContentSchedule, sequelize } = require('../models');

class AnalyticsService {
  static async getSubjectAnalytics() {
    // 1. Most active subject (by number of contents)
    const mostActiveSubjects = await Content.findAll({
      attributes: [
        'subject',
        [sequelize.fn('COUNT', sequelize.col('id')), 'contentCount'],
      ],
      group: ['subject'],
      order: [[sequelize.literal('contentCount'), 'DESC']],
      limit: 5,
    });

    // 2. Content usage tracking (by scheduled duration)
    const subjectDurations = await ContentSchedule.findAll({
      attributes: [
        [sequelize.col('Content.subject'), 'subject'],
        [sequelize.fn('SUM', sequelize.col('duration')), 'totalDuration'],
      ],
      include: [
        {
          model: Content,
          attributes: [],
        },
      ],
      group: [sequelize.col('Content.subject')],
      order: [[sequelize.literal('totalDuration'), 'DESC']],
    });

    return {
      mostActiveSubjects,
      subjectDurations,
    };
  }
}

module.exports = AnalyticsService;
