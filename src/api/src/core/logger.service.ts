import { Injectable, Logger } from '@nestjs/common';
import { logger, levels } from '../config/logging.config';

@Injectable()
export class LoggerService extends Logger {
  log(message: any, context: string = levels.info): any {
    logger.log({ level: context, message });
    super.log(message, context);
  }
  error(message: any, trace?: string): any {
    logger.error(message, trace);
    super.error(message, trace);
  }
  warn(message: any): any {
    logger.warn(message);
    super.warn(message);
  }
  info(message: any): any {
    logger.info(message);
    super.log(message);
  }
  http(message: any): any {
    logger.http(message);
    super.log(message);
  }
  verbose(message: any): any {
    logger.verbose(message);
    super.verbose(message);
  }
  debug(message: any): any {
    logger.debug(message);
    super.debug(message);
  }
  silly(message: any): any {
    logger.silly(message);
  }
}
