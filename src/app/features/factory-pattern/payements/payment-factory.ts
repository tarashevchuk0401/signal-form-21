import { PaymentMethod } from 'src/app/features/factory-pattern/factory-pattern';
import { StripePayementDialog } from 'src/app/features/factory-pattern/payements/stripe-payement-dialog/stripe-payement-dialog';
import { PaypalPayementDialog } from 'src/app/features/factory-pattern/payements/paypal-payement-dialog/paypal-payement-dialog';

export function paymentFactory(method: PaymentMethod) {
  switch (method) {
    case 'stripe':
      return StripePayementDialog;
    case 'paypal':
      return PaypalPayementDialog;
    default:
      return PaypalPayementDialog;
  }
}
