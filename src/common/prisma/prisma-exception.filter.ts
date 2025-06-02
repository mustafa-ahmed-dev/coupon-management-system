import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@generated-prisma/client';
import { Response, Request } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  errorCode?: string;
  timestamp: string;
  path: string;
}

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log the full error details
    this.logger.error(`Prisma Error: ${exception?.constructor?.name}`, {
      code: exception?.code,
      message: exception?.message,
      meta: exception?.meta,
      stack: exception?.stack,
    });

    const errorResponse = this.buildErrorResponse(exception, request.url);

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: any, path: string): ErrorResponse {
    const baseResponse: ErrorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Database operation failed',
      timestamp: new Date().toISOString(),
      path,
    };

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ...baseResponse,
        ...this.handleKnownRequestError(exception),
        errorCode: exception.code,
      };
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        ...baseResponse,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Invalid data provided',
      };
    }

    if (exception instanceof Prisma.PrismaClientInitializationError) {
      return {
        ...baseResponse,
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Database connection failed',
      };
    }

    return {
      ...baseResponse,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected database error occurred',
    };
  }

  private handleKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): Partial<ErrorResponse> {
    const target = this.getTargetField(exception);

    switch (exception.code) {
      case 'P2002':
        return {
          statusCode: HttpStatus.CONFLICT,
          message: target
            ? `A record with this ${target} already exists`
            : 'This record already exists (unique constraint violation)',
        };

      case 'P2003':
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: target
            ? `Invalid reference: ${target} does not exist`
            : 'Foreign key constraint violation',
        };

      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The requested record was not found',
        };

      case 'P2004':
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cannot delete record due to existing relationships',
        };

      case 'P2006':
      case 'P2007':
      case 'P2008':
      case 'P2009':
      case 'P2010':
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
      case 'P2015':
      case 'P2016':
      case 'P2017':
      case 'P2018':
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: target
            ? `Invalid value for field: ${target}`
            : 'Invalid data format provided',
        };

      case 'P2021':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The requested table does not exist',
        };

      case 'P2022':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The requested column does not exist',
        };

      default:
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'A database constraint was violated',
        };
    }
  }

  private getTargetField(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string | null {
    if (!exception.meta?.target) return null;

    if (Array.isArray(exception.meta.target)) {
      return exception.meta.target.join(', ');
    }

    return String(exception.meta.target);
  }
}
