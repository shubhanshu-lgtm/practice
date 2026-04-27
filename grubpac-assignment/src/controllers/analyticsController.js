const AnalyticsService = require('../services/analyticsService');
const ResponseHandler = require('../utils/responseHandler');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await AnalyticsService.getSubjectAnalytics();
    return ResponseHandler.sendSuccessResponse(res, {
      message: 'Analytics retrieved successfully',
      data: analytics,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};
