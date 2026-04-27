import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LOGGER_SERVICE,
  LoggerInterface,
} from 'src/app/features/factory-pattern/services/logger.service';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { paymentFactory } from 'src/app/features/factory-pattern/payements/payment-factory';
import { MatDialog } from '@angular/material/dialog';

export type PaymentMethod = 'paypal' | 'stripe';
export interface PaymentFormInterface {
  method: PaymentMethod | null;
}

@Component({
  selector: 'app-factory-pattern',
  imports: [
    FormRoot,
    FormError,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormField,
    MatButton,
  ],
  templateUrl: './factory-pattern.html',
  styleUrl: './factory-pattern.scss',
})
export class FactoryPattern implements OnInit {
  private logger: LoggerInterface = inject(LOGGER_SERVICE);
  private readonly dialog = inject(MatDialog);

  paymentModel = signal<PaymentFormInterface>({
    method: 'stripe',
  });

  paymentForm = form<PaymentFormInterface>(this.paymentModel);

  ngOnInit(): void {
    this.logger.log('MY Factory Pattern');
  }

  onOpenPaymentDialog(): void {
    const method = this.paymentForm.method().value()!;
    const paymentDialog = paymentFactory(method);

    this.dialog.open(paymentDialog, { width: '500px' });
  }
}
