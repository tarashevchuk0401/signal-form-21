import {
  PaymentGatewayInterface,
  PaymentServiceInterface,
  RefoundServiceInterface,
} from 'src/app/features/abstract-factory-pattern/abstract-factory.services';
import { inject, Injectable } from '@angular/core';
import { PaymentMethod } from 'src/app/features/factory-pattern/factory-pattern';

@Injectable({ providedIn: 'root' })
export class PaymentService implements PaymentServiceInterface {
  private readonly stripe = inject(StripeEngine);
  private readonly paypal = inject(PayPalEngine);

  private engine: PaymentGatewayInterface = this.stripe;

  setProvider(provider: PaymentMethod) {
    this.engine = provider === 'stripe' ? this.stripe : this.paypal;
  }

  pay(): void {
    this.engine.pay();
  }

  fetchPaymentDetails(): void {
    this.engine.fetchPaymentDetails();
  }
}

@Injectable()
export class RefoundService implements RefoundServiceInterface {
  private readonly stripe = inject(StripeEngine);
  private readonly paypal = inject(PayPalEngine);

  private engine: PaymentGatewayInterface = this.stripe;

  setProvider(provider: PaymentMethod) {
    this.engine = provider === 'stripe' ? this.stripe : this.paypal;
  }

  refund(): void {
    this.engine.refund();
  }

  fetchRefundDetails(): void {
    this.engine.fetchRefundDetails();
  }
}

@Injectable({ providedIn: 'root' })
export class StripeEngine implements PaymentGatewayInterface {
  refund(): void {
    console.log('Refund with Stripe');
  }
  fetchRefundDetails(): void {
    console.log('Fetch refund details with Stripe');
  }

  pay(): void {
    console.log('Pay with Stripe');
  }
  fetchPaymentDetails(): void {
    console.log('Fetch payment details with Stripe');
  }
}

@Injectable({ providedIn: 'root' })
export class PayPalEngine implements PaymentGatewayInterface {
  refund(): void {
    console.log('Refund with PayPal');
  }
  fetchRefundDetails(): void {
    console.log('Fetch refund details with PayPal');
  }

  pay(): void {
    console.log('Pay with PayPal');
  }
  fetchPaymentDetails(): void {
    console.log('Fetch payment details with PayPal');
  }
}
