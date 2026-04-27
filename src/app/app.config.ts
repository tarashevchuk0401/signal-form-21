import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  createLogger,
  LOGGER_SERVICE,
} from 'src/app/features/factory-pattern/services/logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: LOGGER_SERVICE,
      useFactory: createLogger,
    },
  ],
};
