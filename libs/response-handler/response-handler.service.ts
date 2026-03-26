import { Injectable, HttpException } from '@nestjs/common';
import { ERROR_CODES, ErrorMessages } from '../constants/commonConstants';
import { ApiResponse } from '../interfaces/commonTypes/apiResponse.interface';

@Injectable()
export class ResponseHandlerService {
  sendSuccessResponse(res: any, response: ApiResponse.ApiOK) {
    res.status(200).json(response);
  }

  sendErrorResponse(res: any, errorBody: any) {
    // normalize Error instances or plain objects
    if (errorBody instanceof HttpException) {
      const status = errorBody.getStatus();
      const response = errorBody.getResponse() as any;
      errorBody = {
        statusCode: status,
        message: typeof response === 'string' ? response : response.message || errorBody.message,
        extraError: errorBody.stack,
      };
    } else if (errorBody instanceof Error) {
      console.error('Error Response (Error object):', errorBody.message, errorBody.stack);
      errorBody = {
        statusCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: errorBody.message || ErrorMessages.UNEXPECTED_ERROR,
        extraError: errorBody.stack,
      };
    } else {
      console.error('Error Response: ', JSON.stringify(errorBody));
    }

    if (!errorBody.statusCode || !errorBody.message) {
      errorBody.statusCode = ERROR_CODES.UNEXPECTED_ERROR;
      errorBody.message = ErrorMessages.UNEXPECTED_ERROR;
    }

    const body: ApiResponse.ApiResponseType = {
      statusCode: errorBody.statusCode,
      message: errorBody.message,
      data: undefined,
      extraError: errorBody.extraError,
      success: false
    };
    res.status(errorBody.statusCode).json(body);
  }
}
