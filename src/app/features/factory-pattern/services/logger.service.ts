import { Injectable, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface LoggerInterface {
  log(message: string): void;
}

@Injectable()
export class ConsoleLoggerService implements LoggerInterface {
  log(message: string): void {
    console.log('LOG', message);
  }
}

@Injectable()
export class ErrorLogService implements LoggerInterface {
  log(message: string): void {
    throw new Error(message);
  }
}

export function createLogger(): LoggerInterface {
  const isProduction = environment.production;

  return isProduction ? new ConsoleLoggerService() : new ErrorLogService();
}

export const LOGGER_SERVICE =
  new InjectionToken<LoggerInterface>('LOGGER_SERVICE');
