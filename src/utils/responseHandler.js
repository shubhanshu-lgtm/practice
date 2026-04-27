/**
 * Consistent API Response Handler
 */
class ResponseHandler {
  /**
   * Send a success response
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {number} options.statusCode - HTTP status code (default: 200)
   * @param {string} options.message - Success message
   * @param {any} options.data - Data to return
   */
  static sendSuccessResponse(res, { statusCode = 200, message = 'Success', data = undefined }) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * Send an error response
   * @param {Object} res - Express response object
   * @param {any} error - Error object or message
   */
  static sendErrorResponse(res, error) {
    let statusCode = error.status || error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    let extraError = undefined;

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      message = error.errors.map((e) => e.message).join(', ');
    }

    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }

    if (error.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    }

    // In development, include stack trace
    if (process.env.NODE_ENV === 'development') {
      extraError = error.stack;
    }

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      extraError,
    });
  }
}

module.exports = ResponseHandler;
