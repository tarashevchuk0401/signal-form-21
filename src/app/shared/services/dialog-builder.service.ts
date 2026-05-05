import { DialogPosition, MatDialogConfig } from '@angular/material/dialog';
import { PaymentMethod } from 'src/app/features/factory-pattern/factory-pattern';

export class DialogBuilderService {
  private config = new MatDialogConfig();

  public setWidth(width: string): this {
    this.config.width = width;
    return this;
  }

  public setPosition(position: DialogPosition): this {
    this.config.position = position;
    return this;
  }

  public setPaymentMethod(method: PaymentMethod): this {
    this.config.data = { paymentMethod: method };
    return this;
  }

  public build(): MatDialogConfig {
    return this.config;
  }
}
