const ContentService = require('../services/contentService');
const ResponseHandler = require('../utils/responseHandler');

exports.uploadContent = async (req, res) => {
  try {
    const content = await ContentService.uploadContent(req.body, req.file, req.user.id);
    return ResponseHandler.sendSuccessResponse(res, {
      statusCode: 201,
      message: 'Content uploaded successfully',
      data: content,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.getMyContent = async (req, res) => {
  try {
    const data = await ContentService.getMyContent(req.user.id, req.query);
    return ResponseHandler.sendSuccessResponse(res, {
      data,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.getAllContent = async (req, res) => {
  try {
    const data = await ContentService.getAllContent(req.query);
    return ResponseHandler.sendSuccessResponse(res, {
      data,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.getPendingContent = async (req, res) => {
  try {
    const contents = await ContentService.getPendingContent();
    return ResponseHandler.sendSuccessResponse(res, {
      data: contents,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.approveContent = async (req, res) => {
  try {
    const content = await ContentService.approveContent(req.params.id, req.body, req.user.id);
    return ResponseHandler.sendSuccessResponse(res, {
      message: `Content ${req.body.status} successfully`,
      data: content,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};
