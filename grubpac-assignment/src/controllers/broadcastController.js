const BroadcastService = require('../services/broadcastService');
const ResponseHandler = require('../utils/responseHandler');

exports.getLiveContentByTeacher = async (req, res) => {
  try {
    const liveContent = await BroadcastService.getLiveContentByTeacher(req.params.teacherId);
    
    if (!liveContent) {
      return ResponseHandler.sendSuccessResponse(res, {
        message: 'No content available',
        data: [],
      });
    }

    return ResponseHandler.sendSuccessResponse(res, {
      data: liveContent,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};
