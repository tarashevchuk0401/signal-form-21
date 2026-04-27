import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-stripe-payement-dialog',
  imports: [MatDialogTitle],
  templateUrl: './stripe-payement-dialog.html',
  styleUrl: './stripe-payement-dialog.scss',
})
export class StripePayementDialog {
  readonly dialogRef = inject(MatDialogRef<StripePayementDialog>);
}
