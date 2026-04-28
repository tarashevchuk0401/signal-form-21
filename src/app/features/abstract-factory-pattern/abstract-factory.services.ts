import { InjectionToken } from '@angular/core';

export interface PaymentServiceInterface {
  pay(): void;
  fetchPaymentDetails(): void;
}

export interface RefoundServiceInterface {
  refund(): void;
  fetchRefundDetails(): void;
}

export class PayPalPaymentService implements PaymentServiceInterface {
  pay(): void {
    console.log('Paying with PayPal');
  }
  fetchPaymentDetails(): void {
    console.log('Fetching PayPal payment details');
  }
}

export class PaypalRefundService implements RefoundServiceInterface {
  refund(): void {
    console.log('Refunding with PayPal');
  }
  fetchRefundDetails(): void {
    console.log('Fetching PayPal refund details');
  }
}

export class StripePaymentService implements PaymentServiceInterface {
  pay(): void {
    console.log('Paying with Stripe');
  }
  fetchPaymentDetails(): void {
    console.log('Fetching Stripe payment details');
  }
}

export class StripeRefundService implements RefoundServiceInterface {
  refund(): void {
    console.log('Refunding with Stripe');
  }
  fetchRefundDetails(): void {
    console.log('Fetching Stripe refund details');
  }
}

export interface PaymentGatewayFactoryInterface {
  payment(): PaymentServiceInterface;
  refound(): RefoundServiceInterface;
}

export class PayPalPaymentFactory implements PaymentGatewayFactoryInterface {
  payment() {
    return new PayPalPaymentService();
  }

  refound(): RefoundServiceInterface {
    return new PaypalRefundService();
  }
}

export class StripePaymentFactory implements PaymentGatewayFactoryInterface {
  payment() {
    return new StripePaymentService();
  }

  refound(): RefoundServiceInterface {
    return new StripeRefundService();
  }
}

export const PAYMENT_GATEWAY =
    new InjectionToken<PaymentGatewayFactoryInterface>('PAYMENT_GATEWAY');
