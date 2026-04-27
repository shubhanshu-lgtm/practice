const AuthService = require('../services/authService');
const ResponseHandler = require('../utils/responseHandler');

exports.register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    return ResponseHandler.sendSuccessResponse(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    return ResponseHandler.sendSuccessResponse(res, {
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user.id);
    return ResponseHandler.sendSuccessResponse(res, {
      data: user,
    });
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error);
  }
};
