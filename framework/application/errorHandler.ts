import { NextFunction } from 'connect';
import { APIError } from '../crosscutting/exceptions/APIError';
import { BusinessError } from '../crosscutting/exceptions/BusinessError';
import { ValidationError } from '../crosscutting/exceptions/ValidationError';
import { UnauthenticatedError } from '../crosscutting/exceptions/UnauthenticatedError';
import { NotFoundError } from '../crosscutting/exceptions/NotFoundError';
import ResponseRequest from '../crosscutting/util/ResponseRequest';
import messages from '../crosscutting/messages/message';

export function ErrorHandler(err: any, req: Request, res, next: NextFunction) {
  const response = new ResponseRequest<string>();

  response.status = 500;
  response.message = messages.errorHandler.SERVER_ERROR;
  response.detais = err.stack;

  if (err instanceof NotFoundError) {
    response.status = 404;
    response.message = messages.errorHandler.NOT_FOUND;
  }

  if (err instanceof UnauthenticatedError) {
    response.status = 401;
    response.message = err.message || messages.errorHandler.UNAUTHENTICATED;
  }

  if (err instanceof ValidationError) {
    response.status = 400;
    response.message = err.message || messages.errorHandler.VALIDATION_ERROR;
    response.detais = err.errors.details;
  }

  if (err instanceof BusinessError) {
    response.status = 400;
    response.message = err.message || messages.errorHandler.BUSINESS_ERROR;
  }

  if (err instanceof APIError) {
    response.status = err.status || 400;
    response.message = err.message || messages.errorHandler.API_ERROR;
    response.detais = err.stack;
  }

  return res.status(response.status).json(response);
}
