import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-paypal-payement-dialog',
  imports: [MatDialogTitle],
  templateUrl: './paypal-payement-dialog.html',
  styleUrl: './paypal-payement-dialog.scss',
})
export class PaypalPayementDialog {
  readonly dialogRef = inject(MatDialogRef<PaypalPayementDialog>);
}
