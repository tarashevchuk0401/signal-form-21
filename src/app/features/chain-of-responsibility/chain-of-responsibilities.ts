import { inject, Injectable } from '@angular/core';

// Shared interface for services
export interface NotificationHandlerInterface {
  handle(notification: string): void;
  setNext(handler: NotificationHandlerInterface): NotificationHandlerInterface;
}

// Base class for services
export abstract class BaseHandler implements NotificationHandlerInterface {
  private handler: NotificationHandlerInterface | null = null;

  setNext(handler: NotificationHandlerInterface): NotificationHandlerInterface {
    this.handler = handler;
    return handler;
  }

  protected pass(message: string): void {
    this.handler?.handle(message);
  }

  abstract handle(message: string): void;
}

@Injectable({ providedIn: 'root' })
export class SmsNotification extends BaseHandler {
  handle(message: string): void {
    // Simplification of logic
    const canHandle = true;

    if (canHandle) {
      console.log('SMS handled:', message);
      return;
    }

    console.log('SMS cannot handle → pass');
    this.pass(message);
  }
}

@Injectable({ providedIn: 'root' })
export class PushNotification extends BaseHandler implements NotificationHandlerInterface {
  handle(message: string): void {
    // Simplification of logic
    const canHandle = true;

    if (canHandle) {
      console.log('PUSH:', message);
      return; // STOP chain here
    }

    console.log('PUSH cannot handle → pass');
    this.pass(message);
  }
}

@Injectable({ providedIn: 'root' })
export class EmailNotification extends BaseHandler implements NotificationHandlerInterface {
  handle(message: string): void {
    // Simplification of logic
    const canHandle = false;

    if (canHandle) {
      console.log('EMAIL handled:', message);
      return;
    }

    console.log('Email cannot handle → pass');
    this.pass(message);
  }
}

@Injectable({ providedIn: 'root' })
export class NotificationChain {
  private handler: NotificationHandlerInterface | null = null;

  private push = inject(PushNotification);
  private email = inject(EmailNotification);
  private sms = inject(SmsNotification);

  constructor() {
    // Define first handler
    this.handler = this.sms;

    // Configure a sequence of handlers
    this.sms.setNext(this.email).setNext(this.push);
  }

  send(notification: string) {
    this.handler?.handle(notification);
  }
}
