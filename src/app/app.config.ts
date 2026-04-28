import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  createLogger,
  LOGGER_SERVICE,
} from 'src/app/features/factory-pattern/services/logger.service';
import {
  PAYMENT_GATEWAY,
  PayPalPaymentFactory,
  StripePaymentFactory,
} from 'src/app/features/abstract-factory-pattern/abstract-factory.services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: LOGGER_SERVICE,
      useFactory: createLogger,
    },
    {
      provide: PAYMENT_GATEWAY,
      useClass:PayPalPaymentFactory,
    }
  ],
};
