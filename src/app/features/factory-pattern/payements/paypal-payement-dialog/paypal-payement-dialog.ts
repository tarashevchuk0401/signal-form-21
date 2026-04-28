import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PaymentDialogData } from 'src/app/features/factory-pattern/payements/payment-factory';

@Component({
  selector: 'app-paypal-payement-dialog',
  imports: [MatDialogTitle],
  templateUrl: './paypal-payement-dialog.html',
  styleUrl: './paypal-payement-dialog.scss',
})
export class PaypalPayementDialog {
  readonly dialogRef = inject(MatDialogRef<PaypalPayementDialog>);
  readonly data = inject<PaymentDialogData>(MAT_DIALOG_DATA);
}
