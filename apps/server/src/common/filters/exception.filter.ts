// UnauthorizedException 401
// Not logged in / bad credentialsForbiddenException 403
// Logged in but no permissionNotFoundException 404
// Resource not foundUnprocessableEntityException 422
// Valid format but can't process (duplicate email, business rule violation)ConflictException 409
// Resource already existsBadRequestException 400
// Malformed request
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // PostgreSQL RESTRICT / FK violation
    if (
      exception instanceof Error &&
      'cause' in exception &&
      (exception.cause as any)?.code === '23001'
    ) {
      return response.status(HttpStatus.CONFLICT).json({
        err: 1,
        data: [],
        msg: 'Cannot delete this record because it is referenced by other records.',
        statusCode: HttpStatus.CONFLICT,
      });
    }
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage =
      typeof message === 'string'
        ? message
        : (message as any).message ?? 'Something went wrong';

    const msg = Array.isArray(errorMessage)
      ? errorMessage.join(', ')
      : errorMessage;

    // log only unexpected errors (500s)
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    } else {
      this.logger.warn(`[${status}] ${msg}`);
    }
    response.status(status).json({
      err: 1,
      data: [],
      msg,
      statusCode: status,
    });
  }
}