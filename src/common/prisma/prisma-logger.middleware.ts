import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PrismaLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('DatabaseRequest');

  use(req: Request, res: Response, next: NextFunction) {
    // Skip logging for health checks and static files
    if (this.shouldSkipLogging(req.path)) {
      return next();
    }

    const start = Date.now();
    const { method, originalUrl, ip } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      const logLevel = statusCode >= 400 ? 'warn' : 'log';
      const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms - ${ip}`;

      this.logger[logLevel](message);

      // Log slow queries
      if (duration > 1000) {
        this.logger.warn(`Slow request detected: ${message}`);
      }
    });

    next();
  }

  private shouldSkipLogging(path: string): boolean {
    const skipPaths = ['/health', '/metrics', '/favicon.ico', '/robots.txt'];
    return skipPaths.some((skipPath) => path.startsWith(skipPath));
  }
}
