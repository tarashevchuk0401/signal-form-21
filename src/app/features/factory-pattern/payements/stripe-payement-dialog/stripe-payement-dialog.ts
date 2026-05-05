import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PaymentDialogData } from 'src/app/features/factory-pattern/payements/payment-factory';



@Component({
  selector: 'app-stripe-payement-dialog',
  imports: [MatDialogTitle],
  templateUrl: './stripe-payement-dialog.html',
  styleUrl: './stripe-payement-dialog.scss',
})
export class StripePayementDialog {
  readonly dialogRef = inject(MatDialogRef<StripePayementDialog>);
  readonly data = inject<PaymentDialogData>(MAT_DIALOG_DATA);
}
